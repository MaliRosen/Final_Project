import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Route, Redirect } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import TeacherEnter from "./components/teacher/teacherEnter";
import StudentEnter from "./components/student/studentEnter";
import Subscribe from "./components/student/subscribe";
import NewClassRoom from "./components/teacher/newClassRoom";
import ViewAttendance from "./components/teacher/viewAttendance";
import Schedule from "./components/teacher/schedule";
import ViewTasks from "./components/teacher/viewTasks";
import ViewTests from "./components/teacher/viewTests";
import Hw from "./components/teacher/hw";
import PreviousLessons from "./components/teacher/previousLessons";
import NewTest from "./components/teacher/newTest";
import NewHw from "./components/teacher/newHw";
import ForgotPassword from "./components/forgotPassword";
import Signup from "./components/signup";
import S_previousLessons from "./components/student/s_previousLessons";
import S_schedule from "./components/student/s_schedule";
import S_viewTests from "./components/student/s_viewTests";
import ViewHw from "./components/student/viewHw";
import ViewMarks from "./components/student/viewMarks";
import AdminMainMenu from "./components/adminMainMenu";
import Zoom from "./components/zoom";
import Header from "./components/header";
import Loading from "./components/share/loading";

import { loginWithToken } from "./services/login";
import "./App.css";
import CONSTANTS from "./constants.js";

function App() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if(history.location.pathname.includes("signup") || history.location.pathname.includes("login")){
      return;
    }
    if (!user?.type) {
      const localData = JSON.parse(localStorage.getItem("token"));
      if (localData?.type ==CONSTANTS.TYPE.ADMIN) {
        dispatch({ type: "save_user", payload: { type: CONSTANTS.TYPE.ADMIN } });
        return;
      }
      if (localData?.token) {
        loginWithToken(localData._id, localData.token).then(res => {
          if (res?.type) {
            dispatch({ type: "save_user", payload: res });
            if (!res?.subject) {
              history.push("/subscribe");
            }
          } else {
            dispatch({ type: "save_user", payload: null });
            localStorage.clear();
            history.push("/login");
          }
        });
      } else {
        dispatch({ type: "save_user", payload: null });
        history.push("/login");
      }
    }
  }, [user, history]);

  return (
    <>
      <Loading />
      {user && <Header />}
      <Route path="/">
        {user?.type == CONSTANTS.TYPE.TEACHER && <TeacherEnter />}
        {user?.type == CONSTANTS.TYPE.STUDENT && <StudentEnter />}
        {user?.type == CONSTANTS.TYPE.ADMIN && <Redirect to="/admin" />}
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/admin">
        {user?.type == CONSTANTS.TYPE.ADMIN ? (
        <AdminMainMenu />
        ) : (
          "אין לך הרשאה מתאימה עבור כניסה לדף זה"
        )}
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/previousLessons">
        <PreviousLessons />
      </Route>
      <Route path="/newClassRoom">
        <NewClassRoom />
      </Route>
      <Route path="/attendance">
        <ViewAttendance />
      </Route>
      <Route path="/tasks">
        <ViewTasks />
      </Route>
      <Route path="/tests">
        <ViewTests />
      </Route>
      <Route path="/newTest">
        <NewTest />
      </Route>
      <Route path="/newHw">
        <NewHw />
      </Route>
      <Route path="/hw">
        <Hw />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/schedule">
        <Schedule />
      </Route>
      <Route path="/s_previousLessons">
        <S_previousLessons />
      </Route>
      <Route path="/s_schedule">
        <S_schedule />
      </Route>
      <Route path="/s_test">
        <S_viewTests />
      </Route>
      <Route path="/s_hw">
        <ViewHw />
      </Route>
      <Route path="/s_marks">
        <ViewMarks />
      </Route>
      <Route exact path="/zoom/:lessonId">
        <Zoom />
      </Route>
      <Route exact path="/zoom/">
        <Zoom />
      </Route>
      <Route path="/subscribe">
        <Subscribe />
      </Route>
    </>
  );
}

export default App;

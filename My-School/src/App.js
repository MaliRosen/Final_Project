import React, { useState, useEffect } from "react";
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
import Admin from "./components/admin";
import YouTube from "./components/youTube";
import ReactPlayer from "./components/youTube";
import Zoom from "./components/zoom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginWithToken } from "./services/login";
import { withRouter } from 'react-router-dom';

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Loading from './components/share/loading'

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user?.type || history.location.pathname.includes('signup') || history.location.pathname.includes('login')) {
  
    } else {
      const localData = JSON.parse(localStorage.getItem("token"));
      if(localData?.type=="admin"){
        dispatch({ type: "save_user", payload: {type:"admin"} });
        return;
      }
      if (localData?.type) {
        loginWithToken(localData._id, localData.token).then((res) => {
          if (res) {
            if(!res.subject){
              history.push("/subscribe"); 
            }
            dispatch({ type: "save_user", payload: res });
          } else {
            history.push("/login"); 
          }
        });
      } else{
        if(!history.location.pathname.includes('signup')){
        history.push("/login"); 
        }       
      }
    }
  }, [user, history]);

  return (<>
        <Loading />
      {user && <Header />}
      <Route path="/">
        {user?.type == "teacher" && <TeacherEnter />}
        {user?.type == "student" && <StudentEnter />}
        {user?.type == "admin" && <Admin/>}{" "}
      </Route>
       <Route path="/login" exact>login
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
      <Route path="/youTube">
        {/* <YouTube /> */}
      </Route>
      <Route path="/reactPlayer">
        <ReactPlayer />
      </Route>
      <Route path="/zoom">
        <ReactPlayer />
        <Zoom />
      </Route>
      <Route path="/subscribe">
        <Subscribe />
      </Route>
    </>
  );
}

export default App;

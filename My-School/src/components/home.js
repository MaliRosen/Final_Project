import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginWithToken } from "../services/login";
import Avatar from "@material-ui/core/Avatar";
import "../style/login.css";
import TeacherEnter from "./teacher/teacherEnter";
import StudentEnter from "./student/studentEnter";

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(async () => {
    if (user) {
    } else {
      const user = JSON.parse(localStorage.getItem("token"));
      if (user) {
        const data = await loginWithToken(user._id, user.token);
        if (data) {
          dispatch({ type: "save_user", payload: data });
        } else {
          history.push("/login");
        }
      } else history.push("/login");
    }
  }, [user]);

  return (
    <div className="">
      <h1>HOME</h1>
      {user?.type == "teacher" && <TeacherEnter />}
      {user?.type == "student" && <StudentEnter />}
      {user?.type == "admin" && history.push("/admin")}
    </div>
  );
};

export default Home;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signupTeacherToServer } from "../services/signupTeacher";
import "../style/admin.css";

function Admin() {
  const dispatch = useDispatch();
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");

  const signupTeacher = async () => {
    try {
      const res = await signupTeacherToServer(subject, firstName, lastName, id, email, password);
      console.log(res);
      dispatch({
        type: "save_teacher",
        payload: { subject, firstName, lastName, id, email, password },
      });
      alert("ברישום בוצע בהצלחה!! ברוכים הבאים לבית סיפרנו!!!!😊😊");
      history.push("/");
    } catch (error) {
      alert("רישום מורה נכשל😒");
    }
  };

  return (
    <div>
      <img className="pic" src={"/images/sign.png"} />
      <img className="profile" src={"/images/profil.png"} />
      <div className="admin-rectangle">
        <h1>הכנס מורה חדש</h1>

        {/* firstName */}
        <div className="input_admin">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder=":הכנס שם פרטי"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* lastname */}
        <div className="input_admin">
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder=":הכנס שם משפחה"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* id */}
        <div className="input_admin">
          <input
            type="text"
            id="id"
            name="id"
            placeholder=":הכנס תז"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        {/* email */}
        <div className="input_admin">
          <input
            type="text"
            id="email"
            name="email"
            placeholder=": הכנס דואר אלקטרוני"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div className="input_admin">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=":הכנס סיסמא"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input_admin">
          <input
            type="text"
            name="subject"
            placeholder=":הכנס מקצוע שהמורה מלמד"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <button
            className="signup btn-sign-teacher"
            onClick={signupTeacher}
          >רישום </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;

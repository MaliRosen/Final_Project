import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, } from "react-redux";
import { saveUser } from "../redux/action";
import { signupToServer } from "../services/signup";
import { getAllSubjectsFromServer } from "../services/subjects";
import { mailToServer } from "../services/mail";
import "../style/signup.css";
import { useValidator, generateId } from './share/validator'

const Signup = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  
  const [firstName, setFirstName, firstNameError] = useValidator("",'string',{required:true});
  const [lastName, setLastName, lastNameError] = useValidator("",'string',{required:true});
  const [id, setId, idError] = useValidator("", 'id',{required:true});
  const [email, setEmail, emailError] = useValidator("",'email',{required:true});
  const [password, setPassword, passwordError] = useValidator("",'password',{required:true});
  const [subject, setSubject, subjectError] = useValidator("",'string',{required:true});
  const [lessons, setLessons] = useState("");

  let res = "";
const validateData =() => {
  if(!subject){setSubject('')}
  return !firstNameError && !lastNameError && !idError && !emailError && !passwordError && subject
}

const test =async () => {
  setFirstName((Math.random() + 1).toString(36).substring(7));
  setLastName((Math.random() + 1).toString(36).substring(7));
  setId(generateId())
  setEmail((Math.random() + 1).toString(36).substring(7)+'@abc.com');
  setPassword('12345678');
  if(lessons){
    setSubject(lessons[0]);
  } else {
    res = await getAllSubjectsFromServer();
    setSubject(res[0] || ' ');
  }

}

  const signup = async () => {
    const newUser={  subject, firstName, lastName, id, email, password }
    if(validateData()){
        signupToServer(newUser).then(res=>{
          dispatch({type: "save_user", payload: newUser});
          localStorage.setItem("token", JSON.stringify({ type: "student", email: res.resultEmail,  _id: res.result?._id,token: res?.token}));
          alert("ברישום בוצע בהצלחה!! ברוכים הבאים לבית סיפרנו!!!!😊😊");
          history.push("/");
        }).catch (error=> {
          if(error.message){
            alert(error.message);
          } else {
          alert("הרישום נכשל😒");
          }
        })
    }
  };

  const getAllSubjects = async () => {
    try {
      res = await getAllSubjectsFromServer();
      console.log("----aaa----", res);

      setLessons(res);
    } catch (error) {
      console.log("error", error);
      alert(" נכשל😒");
    }
  };


  
  return (
    <div className="">
      <img className="pic" src={"/images/sign.png"} />
      <img className="profile" src={"/images/profil.png"} />
      <div className="Rectangle">
        <div className="input_sign">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder=":שם פרטי"
            value={firstName}
            onBlur={(e) => setFirstName(e.target.value)}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="error-message">{firstNameError}</div>
        </div>

        {/* lastname */}
        <div className="input_sign">
          <input
            name="lastname"
            placeholder=":שם משפחה"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) =>setLastName(e.target.value)}
          />
          <div className="error-message">{lastNameError}</div>
        </div>

        {/* id */}
        <div className="input_sign">
          <input
            type="number"
            id="id"
            name="id"
            placeholder=":תז"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={(e) => setId(e.target.value)}
          />
          
          <div className="error-message">{idError}</div>
        </div>

        {/* email */}
        <div className="input_sign">
          <input
            type="text"
            id="email"
            name="email"
            placeholder=":דואר אלקטרוני"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value)}
          />
          <div className="error-message">{emailError}</div>
        </div>

        {/* password */}
        <div className="input_sign">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=":סיסמא"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) =>  setPassword(e.target.value)}
          />
          <div className="error-message">{passwordError}</div>
        </div>

        <div className="btn-s">
          <div>
            <button className="button btn-shwo" onClick={getAllSubjects} >
              👉 לחץ כדי לבחור קורס
            </button>
            {lessons && (
              <div>
                {lessons.map((lesson, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSubject(lesson.subject);
                    }}
                  >
                    {lesson.subject}
                  </button>
                ))}
                {lessons.length == 0 &&
                  "אין שיעורים לבחירה, אנא פנה למנהל המערכת"}
              </div>
            )}
          <div className="error-message">{subjectError}</div>
          </div>

          <div>
            <button className="button btn-sign" onClick={signup} >רישום </button>
            {/* <button className="button btn-sign" onClick={test} >test </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

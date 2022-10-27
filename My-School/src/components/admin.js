import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signupTeacherToServer } from "../services/signupTeacher";
import "../style/admin.css";
import { useValidator, generateId } from './share/validator'

function Admin() {
  const dispatch = useDispatch();
  let history = useHistory();

  const [firstName, setFirstName, firstNameError] = useValidator("",'string',{required:true});
  const [lastName, setLastName, lastNameError] = useValidator("",'string',{required:true});
  const [id, setId, idError] = useValidator("", 'id',{required:true});
  const [email, setEmail, emailError] = useValidator("",'email',{required:true});
  const [password, setPassword, passwordError] = useValidator("",'password',{required:true});
  const [subject, setSubject, subjectError] = useValidator("",'string',{required:true});

  const validateData =() => {
    return !firstNameError && !lastNameError && !idError && !emailError && !passwordError && !subjectError
  }

  const signupTeacher = async () => {
      if(validateData){
        signupTeacherToServer({subject, firstName, lastName, id, email, password}).then(res=>{
        console.log(res);
        dispatch({
          type: "save_teacher",
          payload: { subject, firstName, lastName, id, email, password },
        });
        alert("מורה נוסף בהצלחה!!!!😊😊");
        history.push("/admin/teachersList");
      }).catch (error=> {
        if(error.message){
          alert(error.message);
        } else {
          alert("רישום מורה נכשל😒");
        } 
    })
  }
  };

  const test =async () => {
    setFirstName((Math.random() + 1).toString(36).substring(7));
    setLastName((Math.random() + 1).toString(36).substring(7));
    setId(generateId())
    setEmail((Math.random() + 1).toString(36).substring(7)+'@abc.com');
    setPassword('12345678');
    setSubject((Math.random() + 1).toString(36).substring(7));
  }

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
     
      <div className="input_sign">
          <input
            type="text"
            name="subject"
            placeholder=":קורס שהמורה מלמד"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={(e) => setSubject(e.target.value)}
          />
        <div className="error-message">{subjectError}</div>
      </div>
      <div >
          <button className="button btn-sign-teacher" onClick={signupTeacher} >רישום </button>
          {/* <button className="button btn-sign-teacher" onClick={test} >test </button> */}
      </div>
    </div>
  </div>
  );
};

export default Admin;
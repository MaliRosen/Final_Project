import { useState } from "react";
import { useHistory } from "react-router-dom";

import { forgetPassword } from "../services/forgetPassword";
import "../style/forgotPassword.css";
import { useValidator } from './share/validator'

function ForgotPassword() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword, passwordError] = useValidator("",'password',{required:true});
  const [password2, setPassword2] = useState("");

  const update = async () => {
    const res = await forgetPassword(email, password);
    console.log("reset password response: ", res);
    history.replace("/login");
  };

  return (
    <div className="">
      <img className="pic_forgot" src={"/images/forgot.png"} />
      <img className="profile_forgot" src={"/images/profil.png"} />
      <div className="rectangle_forgot">
        <div className="input_sign">
          <input
            type="text"
            id="email"
            name="email"
            placeholder=":דואר אלקטרוני"
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="iinput_sign">
          <input
            type="password"
            id="uPassword"
            name="uPassword"
            placeholder=":סיסמא חדשה"
            value={password}
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="error-message">{passwordError}</div>

        <div className="iinput_sign">
          <input
            type="password"
            id="uPassword"
            name="uPassword"
            placeholder=":הזנה שוב לצורך אימות"
            value={password2}
            onChange={(e) => {
              console.log(e.target.value);
              setPassword2(e.target.value);
            }}
          />
        </div>
        <div className="error-message">{password2!==password && 'הסיסמאות לא תואמות'}</div>
        <div className="btn-login_after_update">
          <button onClick={() => update()}> עדכן </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

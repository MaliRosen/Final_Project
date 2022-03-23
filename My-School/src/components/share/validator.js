import validator from "validator";
import { useState, useEffect } from "react";

export const useValidator = (defaultValue, type, options = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState(false);

  const onValueChange = (newValue) => {
    setValue(newValue);
    if (options.required && !newValue) {
      setErrorMessage("שדה זה הינו חובה!");
      return;
    } else {
      setErrorMessage("");
    }
    if (typeof VALIDATION_OPTIONS[type] === "function") {
      if (!VALIDATION_OPTIONS[type](newValue)) {
        setErrorMessage(VALIDATION_MESSAGES[type] || "שדה זה מכיל ערך שגוי");
      } else {
        setErrorMessage("");
      }
    }
  };
  return [value, onValueChange, errorMessage];
};

const validateId = (val) => {
  return (
    val
      .split("")
      .map((el, i) => el * (i % 2 ? 2 : 1))
      .map((el) =>
        el > 9
          ? String(el)
              .split("")
              .reduce((a, b) => Number(a) + Number(b), 0)
          : el
      )
      .reduce((a, b) => Number(a) + Number(b), 0) %
      10 ==
    0
  );
};

const VALIDATION_OPTIONS = {
  email: validator.isEmail,
  mobilePhone: validator.isMobilePhone,
  id: validateId,
  password: (val) => val.length >= 8, //(val) => validator.isStrongPassword(val, { minLength: 8 }),
};
const VALIDATION_MESSAGES = {
  email: "שדה זה חייב להכיל כתובת מייל",
  password: "סיסמא חייבת להכיל לפחות 8 תווים",
};

//generate id
export function generateId() {
  var iid="", num, counter=0;
  for(var i=0;i<8;i++) {
    let min =(i<2)?2:0
    let max= (i<2)?3:9
      num=Math.floor(Math.random() * (max - min + 1)) + min;
      iid+=num.toString();
       var inc = Number(num)*((i%2)+1);
      counter+= (inc>9)?inc-=9:inc;
  }
  return iid+(10-(counter%10)).toString();
}
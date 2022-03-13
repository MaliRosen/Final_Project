import { useState } from "react";

const UseUploadFile = () => {
  const [fileData, setFileData] = useState();

  const onfileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (file) => setFileData(file.target.result);
  };

  return { fileData, onfileChange };
};

export default UseUploadFile;

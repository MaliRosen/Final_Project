import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { viewTestsFromServer } from "../../services/viewTests";
import { connect, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import StudentMainMenu from "../studentMainMenu";
import { postMyFileToServer } from "../../services/postMark";
import UseUploadFile from "../fileReader";
import "../../style/student/s_previousLessons.css";

const ViewTests = (props) => {
  const [file, setFile] = useState("");
  const { fileData, onfileChange } = UseUploadFile();
  // const { file, onfileChange } = UseUploadFile()
  const [tests, setTests] = useState([]);
  // const [closeTest, setCloseTest] = useState(360);
  const dispatch = useDispatch();
  const postMyTestFile = async (lessonId, studentId, file) => {
    //
    let res = "";
    // console.log(file);
    let type = "Test";
    dispatch({ type: "set-loader", payload: true });
    res = await postMyFileToServer({
      type,
      lessonId,
      studentId,
      file: fileData,
    });
    dispatch({ type: "set-loader", payload: true });
    console.log("postMyTestFileToServer", res);
  };

  useEffect(async () => {
    if (props.subject) {
      dispatch({ type: "set-loader", payload: true });
      viewTestsFromServer(props.subject).then((data) => {
        dispatch({ type: "set-loader", payload: false });
        data = data.filter(
          (x) =>
            new Date(x.date) - new Date() > 0 &&
            new Date(x.date) - new Date() >= 30
        );
        data.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setTests(data);
      });
    }
  }, [props.subject]);

  return (
    <div className="table">
      {tests.length > 0 ? (
        <>
          <div className="table">
            <div className="pageTitle">המבחן הקרוב ביותר:</div>
            <table>
              <tbody>
                {/* צריך למיין לפי תאריך רק מ התאריך הנוכחי */}
                {
                  <tr>
                    <td className="td1"> {tests[0]?.nameSubject}</td>
                    <td className="td3"> {tests[0]?.date.slice(0, 10)}</td>
                    {/* <td className="td4"> <a href={tests[0]?.file} download="file">download</a> <iframe src={tests[0]?.file} frameborder="0"></iframe></td> */}
                    <td className="td4">
                      {" "}
                      <a href={tests[0]?.file} download="file">
                        לחץ להורדה
                      </a>{" "}
                    </td>
                    <td>
                      {
                        <input
                          type="file"
                          onChange={onfileChange}
                          placeholder="⬆"
                        ></input>
                      }{" "}
                    </td>
                    <td>
                      <button
                        className="sendBtn"
                        onClick={() =>
                          postMyTestFile(tests[0]._id, props.id, file)
                        }
                      >
                        {" "}
                        שלח
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="table">
            <div className="pageTitle">בחודש הקרוב: </div>
            <table>
              <tbody>
                {tests?.slice(1).map((t) => (
                  <tr>
                    <td className="td1"> {t?.nameSubject}</td>
                    <td className="td3"> {t?.date.slice(0, 10)}</td>
                    <td className="td4">
                      {" "}
                      <a href={t?.file} download="file">
                        לחץ להורדה
                      </a>{" "}
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={onfileChange}
                        placeholder="⬆"
                      ></input>{" "}
                    </td>
                    <button
                      className="sendBtn"
                      onClick={() => postMyTestFile(t._id, props.id, file)}
                    >
                      {" "}
                      שלח
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        "לא נמצאו מבחנים עתידיים"
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.user?.user?._id,
    fname: state.user?.user?.firstName,
    subject: state.user?.user?.subject,
  };
};
export default connect(mapStateToProps, {})(ViewTests);

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStudentService } from "../services/studentService";

const Zoom = () => {
  const subject = useSelector((state) => state.user.user.subject);
  const subjewct = useSelector((state) => {});
  const studentService = useStudentService();
  const [lesson, setLesson] = useState();
  useEffect(() => {
    if (subject) {
      studentService
        .post("lesson/attendance", { date: new Date(), subject: subject })
        .then((data) => setLesson(data.lesson));
    }
  }, [subject]);
  return (
    <div className="table">
      {lesson ? (
        <div style={{ width: "75%" }}>
          <video width="320" height="240" controls>
            {lesson.video && <source src={lesson.video} type="video/mp4" />}
            Your browser does not support the video tag.
          </video>
        </div>
      ) : "לא נמצא שיעור פעיל"}
    </div>
  );
};
export default Zoom;

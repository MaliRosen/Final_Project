import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom'
import { useStudentService } from "../services/studentService";
import { useMySchoolService } from '../services/mySchoolService'

const Zoom = () => {
  const subject = useSelector((state) => state.user.user.subject);

  const MySchoolService =useMySchoolService()
  const studentService = useStudentService();
  const [lesson, setLesson] = useState();

  const lessonId = useParams().lessonId;

  useEffect(() => {
    if (subject && !lessonId) {
      studentService
        .post("lesson/attendance", { date: new Date(), subject: subject })
        .then((data) => setLesson(data.lesson));
    }
  }, [subject]);

  useEffect(() => {
    if (lessonId) {
      MySchoolService
        .get("lesson/watch", lessonId)
        .then((data) => setLesson(data.lesson));
    }
  }, [lessonId]);

  return (
    <div className="table">
      {lesson ? (
        <div style={{ width: "75%" }}>
          <video style={{'max-height': '80vh'}} width="320" height="240" controls>
            {lesson.video && <source src={lesson.video} type="video/mp4" />}
            </video>
        </div>
      ) : "לא נמצא שיעור פעיל"}
    </div>
  );
};
export default Zoom;

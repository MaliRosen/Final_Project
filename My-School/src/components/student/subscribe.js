import {
  getAllSubjectsFromServer,
  subscribeToLesson,
} from "../../services/subjects";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useStudentService } from "../../services/studentService";
import { useMySchoolService } from "../../services/mySchoolService";

import '../../style/student/student.css'

function Subscribe() {
  const dispatch = useDispatch();
  const studentService = useStudentService();
  const MySchoolService = useMySchoolService();
  const [subject, setSubject] = useState("");
  const [lessons, setLessons] = useState([]);

  const getAllSubjects = async () => {
    MySchoolService.get("teacher/allLessons")
      .then((data) => {
        setLessons(data);
      })
      .catch((err) => {
        console.log("error", err);
        alert(" נכשל😒");
      });
  };

  const subscribe = () => {
    studentService.post(
      "lesson/subscribe",
      { subject },
      "update-lesson-for-student"
    );
  };

  return (
    <div className="">
      <h3>שים לב, רישום לשיעור יוציא אותך מהשיעור בו אתה רשום כעת</h3>
      <div className="btn-s">
        <div>
          <button
            className="button btn-shwo"
            onClick={() => {
              getAllSubjects();
            }}
          >
            👉 לחץ כדי לבחור מקצוע
          </button>
          {lessons && (
            <div>
              {lessons.map((lesson, i) => (
                <button className="subscribe-button"
                  key={i}
                  onClick={() => {
                    setSubject(lesson.subject);
                  }}
                >
                  {lesson.subject}{" "}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            className="button btn-sign"
            onClick={() => {
              subscribe();
            }}
          >
            {" "}
            רישום{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;

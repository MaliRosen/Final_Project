import { getAllSubjectsFromServer, subscribeToLesson } from '../../services/subjects';
import {  useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import {useStudentService} from '../../services/studentService'

function Subscribe(){
    const dispatch = useDispatch()
    const studentService=useStudentService()
    const [subject, setSubject] = useState('');
    const [lessons, setLessons] = useState([]);

    const getAllSubjects = async () => {
        try {

            const res = await getAllSubjectsFromServer();
            console.log("----aaa----", res);

            setLessons(res);

        }
        catch (error) {
            console.log("error", error);
            alert(" נכשל😒");
        }
    }

const subscribe=()=>{
    studentService.post('lesson/subscribe', {subject}, 'update-lesson-for-student');
}

    return (<div className="">

        <div className="btn-s">

            <div >
                <button className="button btn-shwo" onClick={() => { getAllSubjects() }} >
                    👉  לחץ כדי לבחור מקצוע
                </button>
                 {lessons && <div>
                        {lessons.map((lesson, i) => (
                            <button key={i} onClick={() => { setSubject(lesson.subject) }}>{lesson.subject}  </button>
                        ))}
                    </div>}
            </div>

            <div >
                <button className="button btn-sign" onClick={() => {subscribe() }
                }> רישום   </button>
            </div>

        </div>
    </div>
    )
}

export default Subscribe
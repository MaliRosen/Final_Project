import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import StudentMainMenu from '../studentMainMenu';
import { getAllLessonsFromServer } from '../../services/getAllLessons';
import { viewMyTestsFromServer } from '../../services/viewTests';
import '../../style/student/s_previousLessons.css';
import { useStudentService } from '../../services/studentService'
const ViewMarks = (props) => {

  const [lessons, setLessons] = useState([]);
  const [tests, setTests] = useState([]);
  const dispatch = useDispatch();
const studentService = useStudentService()
  useEffect(async () => {
    if(props.subject){
    let r=await  studentService.get('student/marks')
    
    getAllLessonsFromServer(props.subject).then((data) => {
      setLessons(data);
      console.log("getAllLessonsFromServer", lessons);
    })
    }
  }, [props.subject])

  useEffect(async () => {
    if(props.subject){
      dispatch({ type: "set-loader", payload:true})
    viewMyTestsFromServer(props.subject, props.id).then((data) => {
      dispatch({ type: "set-loader", payload:false})
      setTests(data);
      console.log("viewMyTestsFromServer", data);
    })
  }
  }, [props])

  return (<div>
    <div className="table">
      <div className="pageTitle">ציונים מהחודש האחרון:</div>
      {tests.length>0?<table>
        <tbody>
        <tr className="title">
          <td>שם שעור </td>
          <td>ציון</td>
        </tr>

        {tests?.map(t => (
          <tr>
            <td className="td2">   {t?.nameSubject}</td>
            {t['marks']?.filter((n) => n.studentId === props.id).map(a => (
              <>
                <td className="td2"> {a?.mark}</td>
              </>)
            )}
          </tr>
        ))}
        </tbody>
      </table>:'לא נמצאו ציונים'}
    </div >
  </div>
  )
}
// cars.filter((item) => item.country === 'Germany');
const mapStateToProps = (state) => {
  return {
    id: state.user?.user?._id,
    fname: state.user?.user?.firstName,
    subject: state.user?.user?.subject,
  };
};
export default connect(mapStateToProps, {})(ViewMarks);



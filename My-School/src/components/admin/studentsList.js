import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import '../../style/student/s_previousLessons.css';
import { useMySchoolService } from '../../services/mySchoolService'

function StudentList(props) {
  const MySchoolService =useMySchoolService()
  const [student, setStudent] = useState([]);

  useEffect(() =>{
      MySchoolService.get('student/all')
       .then(res => {
         res.resultStudent && setStudent(res.resultStudent);
       })
       .catch(err => alert(err))
  }, [])

  const deletestudent= (studentId) => {
    MySchoolService.delete('student',studentId).then(res=>{
      setStudent(oldstudents=>oldstudents.filter(t=>t._id !== studentId))
    })
  }

  return (
    <div>
      <div className="table">
        <div className="pageTitle">
    תלמידים פעילים:
        </div>
        <br />
        {student?.length>0?<table>
          <thead>
            <tr className="title">
              <td className="td3">  שם משפחה </td>
              <td className="td2">  שם פרטי</td>
              <td className="td2">כתובת מייל</td>
              <td className="td4">  סיסמא </td>
              <td className="td2">  מקצוע </td>
            </tr>
          </thead>
          <tbody>
          {student.map(stud => (
            <tr>
              <td className="td4"> {stud?.lastName}</td>
              <td className="td2"> {stud?.firstName}</td>
              <td className="td2"> {stud?.email}</td>
              <td className="td2"> {stud?.password}</td>
              <td className="td2"> {stud?.subject}</td>
              <td><button onClick={()=>deletestudent(stud._id)}>מחק תלמיד</button></td>
            </tr>
          ))}
          </tbody>
        </table>:'לא נמצאו תלמידים'}
      </div>
    </div>
  )
}

export default StudentList;
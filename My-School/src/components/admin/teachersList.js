import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import '../../style/student/s_previousLessons.css';
import { useMySchoolService } from '../../services/mySchoolService'

function TeacherList(props) {
  const MySchoolService =useMySchoolService()
  const [teachers, setteachers] = useState([]);

  useEffect(() =>{
      MySchoolService.get('teacher/all')
       .then(res => {
         res.resultTeacher && setteachers(res.resultTeacher);
       })
       .catch(err => alert(err))
  }, [])

  const deleteTeacher = (teacherId) => {
    MySchoolService.delete('teacher',teacherId).then(res=>{
setteachers(oldTeachers=>oldTeachers.filter(t=>t._id !== teacherId))
    })
  }
  return (
    <div>
      <div className="table">
        <div className="pageTitle">
    מורים פעילים:
        </div>
        <br />
        {teachers?.length>0?<table>
          <thead>
            <tr className="title">
              <td className="td3">  שם משפחה </td>
              <td className="td2">  שם פרטי</td>
              <td className="td2">  מספר זהות </td>
              <td className="td2">כתובת מייל</td>
              <td className="td4">  סיסמא </td>
              <td className="td2">  מקצוע </td>
            </tr>
          </thead>
          <tbody>
          {teachers.map(teacher => (
            <tr>
              <td className="td4"> {teacher?.lastName}</td>
              <td className="td2"> {teacher?.firstName}</td>
              <td className="td2"> {teacher?.id}</td>
              <td className="td2"> {teacher?.email}</td>
              <td className="td2"> {teacher?.password}</td>
              <td className="td2"> {teacher?.subject}</td>
              <td><button onClick={()=>deleteTeacher(teacher._id)}>מחק מורה</button></td>
            </tr>
          ))}
          </tbody>
        </table>:'לא נמצאו מורים'}
      </div>
              <td><Link to="/admin/newTeacher">הוספת מורה</Link></td>
    </div>
  )
}

export default TeacherList;
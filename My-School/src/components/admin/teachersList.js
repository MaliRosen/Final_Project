import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../style/student/s_previousLessons.css';
import { useMySchoolService } from '../../services/mySchoolService'

function TeacherList(props) {
  const MySchoolService = useMySchoolService()
  const [teachers, setteachers] = useState([]);

  useEffect(() => {
    MySchoolService.get('teacher/all')
      .then(res => {
        res.resultTeacher && setteachers(res.resultTeacher);
      })
      .catch(err => alert(err))
  }, [])

  const deleteTeacher = (teacherId) => {
    MySchoolService.delete('teacher', teacherId).then(res => {
      setteachers(oldTeachers => oldTeachers.filter(t => t._id !== teacherId))
    })
  }
  return (
    <div>
      <div className="table">
        <div className="pageTitle">
          מורים פעילים
        </div>
        <br />
        {teachers?.length > 0 ? <table>
          <thead>
            <tr className="title">
              <td className="td3">  שם משפחה </td>
              <td className="td2">  שם פרטי</td>
              <td className="td2">  מספר זהות </td>
              <td className="td2">כתובת מייל</td>
              <td className="td4">  סיסמא </td>
              <td className="td2">  מקצוע </td>
              <td className="td2">מחק מורה</td>
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
                <td><button type="button" class="btn btn-danger" onClick={() => deleteTeacher(teacher._id)}><svg className='iconDelete' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button></td>
              </tr>
            ))}
          </tbody>
        </table> : 'לא נמצאו מורים'}
      </div>
      <td><Link to="/admin/newTeacher">הוספת מורה</Link></td>
    </div>
  )
}

export default TeacherList;
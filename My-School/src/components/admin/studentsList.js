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
    תלמידים פעילים
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
              <td className="td2">  מחק תלמיד </td>
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
              <td><button onClick={()=>deletestudent(stud._id)} type="button" class="btn btn-danger"><svg className='iconDelete' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button></td>
            </tr>
          ))}
          </tbody>
        </table>:'לא נמצאו תלמידים'}
      </div>
    </div>
  )
}

export default StudentList;
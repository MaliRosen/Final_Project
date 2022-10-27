import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import MainMenu from '../teacherMainMenu';
import Avatar from '@material-ui/core/Avatar';
import { previousLessonToServer } from '../../services/previousLessons';
import '../../style/student/s_previousLessons.css';
import { useMySchoolService } from '../../services/mySchoolService'

const PreviousLessons = (props) => {
  const MySchoolService = useMySchoolService()
  let history = useHistory();
  const [lesss, setless] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.subject) {
      dispatch({ type: "set-loader", payload: true });
      previousLessonToServer(props.subject)
        .then(res => {
          res[0] && setless(res);
          dispatch({ type: "set-loader", payload: false });
        })
        .catch(err => alert(err))
    }
  }, [props.subject])

  useEffect(async () => {
    let res = '';
    res = await previousLessonToServer(props.userId)
    // res = await previousLessonToServer();
    console.log("res", res)
  }, [])

  function newLesson() {
    history.push("/newLesson");
  }
  function goToHw(id) {

    history.push({ pathname: "/newHw", state: { id: id } });
  }
  const deleteLesson = (id) => {debugger
    MySchoolService.delete('lesson/lesson', id)
    .then(res=>{
       if (props.subject) {
      dispatch({ type: "set-loader", payload: true });
      
      previousLessonToServer(props.subject)
        .then(res => {
          setless(res || []);
          dispatch({ type: "set-loader", payload: false });
        })
        .catch(err => alert(err))
    }
    });
   
  }


  return (
    <div>
      <div className="table">
        <div className="pageTitle">
          שיעורים קודמים
        </div>
        <br />
        {lesss?.length > 0 ? <table>
          <thead>
            <tr className="title">
              <td className="td2">מס שעור</td>
              <td className="td2"> שם שעור</td>
              <td className="td3">  תאריך </td>
              <td className="td4">  הערות </td>
              <td className="td2">  שעה </td>
              <td className="td2">  הורדת ש.ב </td>
              <td className="td2">  הכנסת ש.ב </td>
              <td className="td2">צפיה בשיעור </td>
              <td className="td2"> מחק שיעור</td>
            </tr>
          </thead>
          <tbody>
            {lesss.map(herLess => (
              <tr>
                <td className="td2"> {herLess?.numLesson}</td>
                <td className="td2"> {herLess?.lessonName}</td>
                {/* <td> {herLess?.file}</td> */}
                <td className="td3"> {herLess?.date?.slice(0, 10)}</td>
                <td className="td4"> {herLess?.notes}</td>
                <td className="td2"> {herLess?.time}</td>
                {/* {  <button onClick={()=>goToHw(herLess._id)}>שעורי בית להכניס  </button>} */}
                <td>
                  {herLess.file && <a href={herLess.file} download={"hw_" + herLess.lessonName}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg></a>}
                </td>
                <td>  <a className='downloadH' onClick={() => goToHw(herLess.numLesson)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg></a></td>
                <td><Link to={"/zoom/" + herLess._id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg></Link></td>
                <td><button type="button" class="btn btn-danger" onClick={() => deleteLesson(herLess._id)}><svg className='iconDelete' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></button></td>
              </tr>
            ))}
          </tbody>
        </table> : 'לא נמצאו שיעורים קודמים'}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {

  return {

    userId: state.user?.user?.id,
    fname: state.user?.user?.firstName,
    subject: state.user?.user?.subject,
  };
};

export default connect(mapStateToProps, {})(PreviousLessons);
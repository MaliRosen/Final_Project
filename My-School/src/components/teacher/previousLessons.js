import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import MainMenu from '../teacherMainMenu';
import Avatar from '@material-ui/core/Avatar';
import { previousLessonToServer } from '../../services/previousLessons';
import '../../style/student/s_previousLessons.css';


const PreviousLessons = (props) => {
  // 
  let history = useHistory();
  const [lesss, setless] = useState([]);
  const dispatch =useDispatch();
  // const res = history.location.state ? history.location.state.res : [];
  useEffect(() =>{
    if(props.subject){
      dispatch({ type: "set-loader", payload:true});
       previousLessonToServer(props.subject)
       .then(res => {
         res[0] && setless(res);
         dispatch({ type: "set-loader", payload:false});
       })
       .catch(err => alert(err))
    }
  }, [props.subject])

  useEffect(async()=>{
    let res = '';
    res = await previousLessonToServer(props.userId)
    // res = await previousLessonToServer();
    console.log("res", res)
  },[])

  function newLesson() {
    history.push("/newLesson");
  }
  function goToHw(id) {

    history.push({ pathname: "/newHw", state: { id: id } });
  }

  // useEffect(() => setless(res), []);
  //   useEffect(() => setless(res22),[])
  console.log("less", { lesss })

  return (
    <div>
      <div className="table">
        <div className="pageTitle">
    שיעורים קודמים:
        </div>
        <br />
        {lesss?.length>0?<table>
          <thead>
            <tr className="title">
              <td className="td2">מס שעור</td>
              <td className="td2">  שם שעור</td>
              <td className="td3">  תאריך </td>
              <td className="td4">  הערה </td>
              <td className="td2">  שעה </td>
            </tr>
          </thead>
          <tbody>
          {lesss.map(herLess => (
            <tr>
              <td className="td2"> {herLess?.numLesson}</td>
              <td className="td2"> {herLess?.lessonName}</td>
              {/* <td> {herLess?.file}</td> */}
              <td className="td3"> {herLess?.date?.slice(0,10)}</td>
              <td className="td4"> {herLess?.notes}</td>
              <td className="td2"> {herLess?.time}</td>
              {/* {  <button onClick={()=>goToHw(herLess._id)}>שעורי בית להכניס  </button>} */}
              {<button className="sendBtn" onClick={() => goToHw(herLess.numLesson)}>ש.ב להכניס  </button>}
            </tr>
          ))}
          </tbody>
        </table>:'לא נמצאו שיעורים קודמים'}
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
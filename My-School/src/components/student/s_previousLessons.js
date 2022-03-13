import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { previousLessonToServer } from '../../services/previousLessons';
import { connect, useDispatch } from "react-redux";
import StudentMainMenu from '../studentMainMenu';
import Avatar from '@material-ui/core/Avatar';
import '../../style/student/s_previousLessons.css';


const PreviousLessons = (props) => {
  let history = useHistory();
  const [lesss, setless] = useState();
  const dispatch = useDispatch();

  useEffect(() =>{if(props.subject) {
    dispatch({ type: "set-loader", payload:true})
    previousLessonToServer(props.subject).then(res => {
    dispatch({ type: "set-loader", payload:false})
      res[0] && setless(res)
    }).catch(err => alert(err))}
  }, [props.subject])



  useEffect(() => setless(history.location.state?.res || []), [history.location]);
  console.log("less", { lesss })
  return (

    <div>
      <div className="table">
        <div className="pageTitle">
    שיעורים קודמים:
        </div>
        <br />
        {lesss?.length>0?<table>
          <tbody>
          <tr className="title">
            <td className="td1">שם המורה</td>
            <td className="td2">מס' שיעור</td>
            <td className="td3">נושא</td>
            <td className="td4">חומר לשיעור</td>
            <td className="td5">תאריך</td>
            <td className="td6">הערות</td>

          </tr>


          {lesss?.map((herLess,i) => (
            //  {lesss.filter(ls => ls.subject === props.subject).map(herLess => (
            <tr key={i}>
              <td className="td1">   {herLess?.teacher}</td>
              <td className="td2">   {herLess?.numLesson}</td>
              <td className="td3">    {herLess?.lessonName}</td>
              <td className="td4"> <a href={herLess.file} download="file"> לחץ להורדה</a> </td>
              {/* <td className="td4"> <a href={herLess.file} download="file">להורדה</a> <iframe className="aa" src={herLess.file} frameborder="0"></iframe></td> */}
              <td className="td5">   {herLess?.date.slice(0, 10)}</td>
              <td className="td6"> {herLess?.notes}</td>
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
    // id:state.user?.user?.id,
    userId: state.user?.user?.id,
    fname: state.user?.user?.firstName,
    subject: state.user?.user?.subject,
  };
};

export default connect(mapStateToProps, {})(PreviousLessons);
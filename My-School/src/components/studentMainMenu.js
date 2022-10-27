
// import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { connect, useDispatch } from "react-redux";
// import '../style/homePage.css';



// const Header = (props) => {
//     const history = useHistory();


//     function viewAttendanceClick() {
//         history.push("/attendance");
//     }
//     function viewTasksClick() {
//         history.push("/tasks");
//     }
//     function viewTestsClick() {
//         history.push("/tests");
//     }
//     function newClassClick() {
//         history.push("/newClassRoom", history.location.state);
//     }



//     return (<div className="menu">
//         {/* <button className="previouslessons" onClick={previouslessonsClick} >  שיעורים קודמים   </button> */}
//         <div>
//         <img className="logo" src={"/images/logo.png"} />
//         </div>
//         <button className="previouslessons" onClick={previouslessonsClick} >  שיעורים קודמים   </button>
//         <button className="test" onClick={marksClick}> צפיה בציונים   </button>
//         <button className="hw" onClick={hwClick}> תרגילים שהוגשו   </button>
//         <button className="schedule" onClick={scheduleClick}>  מערכת שעות   </button>
//         <button className="test" onClick={testClick}>  מבחנים  </button>
//         <button onClick={enterLessonClick}>  כניסה לשיעור  </button>
//     </div>
//     );

// }


// export default Header;

import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { attendanceToServer } from '../services/attendance'
import { connect, useDispatch } from "react-redux";
import { previousLessonToServer } from '../services/previousLessons';
import '../style/header.css';
import '../style/headerS.css';


const StudentMainMenu = (props) => {

  let history = useHistory();

  const previouslessonsClick = async () => {
    let res = '';
    // res= await previousLessonToServer(props.userId)
    res = await previousLessonToServer();
    console.log("res", res)
    history.push("s_previouslessons", { res });
  }

  function marksClick() {
    history.push("/s_marks");
  }

  function hwClick() {
    history.replace("/s_hw");
  }
  function scheduleClick() {
    history.push("/s_schedule");
  }
  function testClick() {
    history.push("/s_test");
  }

  const enterLessonClick = async () => {
    let d = new Date();
    try {
      // const res = await attendanceToServer(d, props.userId, props.sub,);
      // console.log(res);
      history.push("/zoom");
    }
    catch (error) {
      alert("הרישום נכשל😒");
    }
  }

  const subscribeClick = () => {
    history.push("/subscribe");

  }


  return (
    <div>
      <div className="menu">
        <div>
          <Link to="/"> <img className="menu-logo" src={"/images/logo.png"} /></Link>
        </div>
        <button className=" menu-btn2" onClick={previouslessonsClick} ><div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-end-btn" viewBox="0 0 16 16">
          <path d="M6.79 5.093 9.5 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .79-.407z" />
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg></div>  שיעורים קודמים   </button>
        <button className=" menu-btn2" onClick={marksClick}><div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data" viewBox="0 0 16 16">
          <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
          <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
          <path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z" />
        </svg> </div>  צפיה בציונים   </button>
        <button className=" menu-btn2" onClick={hwClick}><div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
        </svg> </div>שעורי בית   </button>
        <button className=" menu-btn2" onClick={scheduleClick}><div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
        </svg> </div>  מערכת שעות   </button>
        <button className=" menu-btn2" onClick={testClick}><div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
        </svg></div>  מבחנים  </button>
        <button className="menu-btn2" onClick={enterLessonClick}>  <div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pc-display-horizontal" viewBox="0 0 16 16">
          <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z" />
        </svg></div>כניסה לשיעור  </button>
        {/* <button className="menu-btn2" onClick={subscribeClick}>  <div className='iconMenu'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
        </svg></div> רישום לשיעור  </button> */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {

  return {
    userId: state.user?.user?._id,
    fname: state.user?.user?.firstName,
    sub: state.user?.user?.subject,
  };
};
// export default connect(mapStateToProps, {})(Login);
export default connect(mapStateToProps, {})(StudentMainMenu);

// export default Students;

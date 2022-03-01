
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
      const res = await attendanceToServer(d, props.userId, props.sub,);
      console.log(res);
      history.push("/zoom");
    }
    catch (error) {
      alert("הרישום נכשל😒");
    }
  }

  const subscribeClick=()=>{
    history.push("/subscribe");

  }


  return (
    <div>
      <div className="menu">
        <div>
        <Link to="/"> <img className="menu-logo" src={"/images/logo.png"} /></Link>
        </div>
        <button className=" menu-btn2" onClick={previouslessonsClick} >  שיעורים קודמים   </button>
        <button className=" menu-btn2" onClick={marksClick}> צפיה בציונים   </button>
        <button className=" menu-btn2" onClick={hwClick}>שעורי בית    </button>
        <button className=" menu-btn2" onClick={scheduleClick}>  מערכת שעות   </button>
        <button className=" menu-btn2" onClick={testClick}>  מבחנים  </button>
        <button className="menu-btn2" onClick={enterLessonClick}>  כניסה לשיעור  </button>
        <button className="menu-btn2" onClick={subscribeClick}>  רישום לשיעור  </button>
      
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

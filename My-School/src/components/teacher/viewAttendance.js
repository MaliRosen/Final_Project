import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import MainMenu from '../teacherMainMenu';
import Avatar from '@material-ui/core/Avatar';
import { connect, useDispatch } from "react-redux";
import { getAllAttendanceFromServer } from '../../services/getAllAttendance';


const ViewAttendance = (props) => {

    const [attendance, setAttendance] = useState('');

    useEffect(async () => {

        getAllAttendanceFromServer().then((data) => {
            setAttendance(data);debugger
        })
    }, [])

    return (<div>
        
        {/* <MainMenu /> */}
        {attendance&&attendance.map(a => (
        <li>
          {a?.name}
          {a?.attendance} 
        </li>
      ))}

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

export default connect(mapStateToProps, {})(ViewAttendance);

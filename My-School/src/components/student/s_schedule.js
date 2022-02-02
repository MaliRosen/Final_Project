import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import StudentMainMenu from '../studentMainMenu';
import Avatar from '@material-ui/core/Avatar';
import { connect, useDispatch } from "react-redux";
import { getAllScheduleFromServer } from '../../services/getAllSchedule';
import '../../style/student/s_previousLessons.css';

const Schedule = (props) => {
    const [schedule, setSchedule] = useState([]);
    // useEffect(async () => {
    //     getAllScheduleFromServer(props.subject).then((data) => {
    //         
    //         (setSchedule(data))
    //     })
    // }, [])

    useEffect(async () => {
        if(props.subject){
        getAllScheduleFromServer(props.subject).then((data) => {
            data = data.filter(x => new Date(x.date) - new Date() > 0 && new Date(x.date) - new Date() >= 30)
            data.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })
            setSchedule(data);
        })
    }
    }, [props.subject])

    return (<div>
                <div className="table">
            <div className="pageTitle">
                מערכת שעות:
            </div>
            <br />
            <table>
                <thead>
                    <tr className="title">
                        <td className="td2">תאריך </td>
                        <td className="td3">שעור</td>
                    </tr>
                </thead>
                <tbody>
                {schedule?.map(s => (
                    <tr>
                        <td className="td1"> {s?.date.slice(0, 10)}</td>
                        <td className="td2"> {s?.lessonName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}
const mapStateToProps = (state) => {
    return {
        fname: state.user?.user?.firstName,
        subject: state.user?.user?.subject,
    };
};
export default connect(mapStateToProps, {})(Schedule);

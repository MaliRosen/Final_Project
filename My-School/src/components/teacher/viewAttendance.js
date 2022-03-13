import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import MainMenu from '../teacherMainMenu';
import Avatar from '@material-ui/core/Avatar';
import { connect, useDispatch } from "react-redux";
import { getAllAttendanceFromServer } from '../../services/getAllAttendance';


const ViewAttendance = (props) => {

    const [data, setData] = useState({attendance:[],students:[], lesson:[]});
    const dispatch = useDispatch();

    useEffect(async () => {
        if(props.subject){
            dispatch({ type: "set-loader", payload:true})
            getAllAttendanceFromServer(props.subject).then((data) => {
                const attendance=data.students?.map(stud=>{ 
                    return data.lessons?.map(less=>{
                      return {student:stud._id, Attendance: !!less.arrAttendance.find(s=>s.studentId===stud._id)}
                    })
                  });
                setData({attendance,students:data.students, lessons:data.lessons});

                dispatch({ type: "set-loader", payload:false})
            })
    }
    }, [props.subject])

    return (<div>
        <div className="pageTitle">{data.lessons && data.lessons[0]?.subject} :גליון נוכחות עבור שיעור  </div>
        <table className="table">
            <thead >
                <tr className="title">
                    <th></th>
                    {data.lessons?.map((less, i)=><th className={"td"+i}>{less.lessonName}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.attendance?.map((a, aIndex) => (
                    <tr>
                        <td>{data?.students[aIndex]?.firstName} {data?.students[aIndex]?.lastName}</td>
                        {a.map(b=><td className={"td"+aIndex}> {b.Attendance?'V':'X'}</td>)} 
                    </tr>
                 ))}
            </tbody>
        </table>
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

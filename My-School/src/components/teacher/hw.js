import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getAllHwFromServer } from '../../services/getAllHw';
import Avatar from '@material-ui/core/Avatar';
import MainMenu from '../teacherMainMenu';
import MarkToUpdate from './markToUpdate';
import '../../style/student/s_previousLessons.css';

const Hw = (props) => {

    const [hw, setHw] = useState([]);
    const [oneHw, setOneHw] = useState();
    const [oneHwLessonName, setOneHwLessonName] = useState();

    useEffect(async () => {
        if(props.subject){
            getAllHwFromServer(props.subject).then((data) => {
                setHw(data)
            })
        }
    }, [props.subject])


    let history = useHistory();

    function newHw() {
        history.push("/newHw");
    }

    function hwStudents(hw, lessonName) {
        console.log("hw: " + hw);
        setOneHw(hw);
        setOneHwLessonName(lessonName);
    }
    return (<div>
        
        <MainMenu />
        <div className="wrapper">
            <div className="tableR">
                <div className="pageTitle">
רשימת התרגילים:                </div>
                <br />
                {<table>
                    <tbody>
                    <tr className="title">
                        <td className="td1">שיעור</td>
                        {/* <td className="td1"> ציון תלמיד וקובץ</td> */}
                            <td >המגישים </td>
                            {/* <td className="td1">תלמיד </td>
                    <td className="td2"> ציון</td> */}
                    </tr>

                    {hw?.map(m => (
                        <tr>
                            <td>  {m.lessonName}</td>
                            {/* {m['arrHw']?.map(n =>
                        <tr>
                            <td > <a href={n.file} download="h.w of student">⬇</a></td>
                            <td className="td1"> {n?.studentId}</td>
                            <td className="td2"> {n?.mark}</td>
                        </tr>)} */}
                            <button className="sendBtn" onClick={() => hwStudents(m?.arrHw, m?._id)}>הנבחנים</button>
                        </tr>
                    ))}
                    </tbody>
                </table>}
            </div>


            <div className="tableL">
                <div className="pageTitle">
ציוני התלמידים:                </div>
                <br />
                {<table>
                    <thead>
                        <tr className="title">
                            <td className="td1">קובץ</td>
                            <td className="td2">ציון </td>
                        </tr>
                    </thead>
                    <tbody>
                    {oneHw?.map(t => (
                        <tr>
                            <td > <a href={t.file} download="hw">⬇</a></td>
                            <MarkToUpdate type="lesson" studentId={t?.studentId._id} studentName={t?.studentId.firstName} lessonId={oneHwLessonName} mark={t.mark}></MarkToUpdate>
                            {/* <tr>
                    <td className="td1"> {t?.studentId}</td>
                    <td className="td2"> {t?.mark}</td>
                </tr> */}
                        </tr>
                    ))}
                    </tbody>
                </table>}
            </div>
            <button className="sendBtn newTest" onClick={newHw}> שעורי בית חדשים </button>
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

export default connect(mapStateToProps, {})(Hw);

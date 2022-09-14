import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import UseUploadFile from '../fileReader';
import Avatar from '@material-ui/core/Avatar';
import MainMenu from '../teacherMainMenu';
import { useHistory } from "react-router-dom";
import { getAllTestsFromServer } from "../../services/getAllTests"
import { viewTestsFromServer } from '../../services/viewTests';
import { previousLessonToServer } from '../../services/previousLessons';
import MarkToUpdate from './markToUpdate';
import '../../style/student/s_previousLessons.css';

const ViewTests = (props) => {

    const [tests, setTests] = useState([]);
    const [show, setShow] = useState(false);
    const [oneTst, setOneTst] = useState();
    const [oneTstLessonName, setOneTstLessonName] = useState();

    const dispatch = useDispatch();

    // useEffect(async () => {
    //     
    //     getAllTestsFromServer().then((data) => {
    //         (setTests(data))
    //         
    //         console.log(tests);
    //     })
    // }, [])
    useEffect(async () => {
        if(props.subject){
            dispatch({ type: "set-loader", payload:true});
        viewTestsFromServer(props.subject).then((data) => {
            setTests(data);
            dispatch({ type: "set-loader", payload:false});
            console.log("viewTests", tests);
        })
    }
    }, [props.subject])

    // const { fileData, onfileChange } = UseUploadFile()
    let history = useHistory();

    function newTest() {
        history.push("/newTest");
    }

    //**** */
    function tst(test, lessonName) {
        console.log("test: " + test);
        setShow(true);
        setOneTst(test);
        setOneTstLessonName(lessonName);
    }
    console.log("oneTst", oneTst);


    return (<div>
        
        <MainMenu />
        <div className="wrapper">
        <div className="tableR">
        <div className="pageTitle">
רשימת המבחנים:        </div>
        <br />
        {tests.length>0?<table>
            <thead>
                <tr className="title">
                    <td className="td1">נושא</td>
                    <td className="td2">תאריך </td>
                    <td className="td2">קובץ מבחן </td>
                    <td className="td2">הנבחנים </td>
                </tr>
            </thead>
            <tbody>
            {tests?.map(test => (
                <tr>
                    <td className="td1"> {test?.nameSubject}</td>
                    <td className="td2"> {test?.date.slice(0,10)}</td>
                    <td className="td2"><a href={test.file} download={'test_'+test.nameSubject}>לחץ להורדה</a></td>
                    <td className="td2"> <button className="sendBtn" onClick={() => tst(test.marks, test?._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></button></td>
                </tr>
            ))}
            </tbody>
        </table>:'לא נמצאו מבחנים'}
        </div>
        {tests.length>0 && <div className="tableL">
        <div className="pageTitle">
ציוני התלמידים:        </div>
        <br />
        <table>
            <thead>
                <tr className="title">
                    <td className="td1">תלמיד</td>
                    <td className="td2">ציון </td>
                </tr>
            </thead>
            <tbody>
            {oneTst?.length > 0 ? oneTst.map(t => (
                <>
                    <MarkToUpdate type="Test" student={t?.studentId._id} studentName={t?.studentId.firstName} lesson={oneTstLessonName} mrk={t.mark}></MarkToUpdate>
                    {/* <tr>
                    <td className="td1"> {t?.studentId}</td>
                    <td className="td2"> {t?.mark}</td>
                </tr> */}
                </>
            )):'לא נמצאו תלמידים'}
            </tbody>
        </table>
        </div>}

        </div>     
        <button className="sendBtn newTest"onClick={newTest}>  מבחן חדש<br/><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg></button>



        {/* <input type="file" onChange={onfileChange}></input> */}
        {/* <div>
            {show ? <div>

            </div>
        
        </div> */}


       
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fname: state.user?.user?.firstName,
        subject: state.user?.user?.subject,
    };
};
export default connect(mapStateToProps, {})(ViewTests);




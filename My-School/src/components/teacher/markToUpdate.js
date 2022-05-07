import React, { useState, useEffect } from 'react';
import { postMarkToServer } from '../../services/postMark';
import { connect, useDispatch } from "react-redux";
// const { ObjectId } = require('mongodb');


const MarkToUpdate = (props) => {

    const [mark, setMark] = useState('');
    const { type,  studentId, lessonId, id, studentName}=props;

    const postMark = async () => {
        let data = await postMarkToServer(type,studentId, mark, lessonId);
        console.log("data", data);
    }
    let a = props.mrk;

    useEffect(() => {setMark(props.mark)},[props.mark])
return (<tr>
                {/* <td className="td1"> student:  {props.student.firstName}</td> */}
                <td className="td1">  {studentName}</td>
                <td>   <input type="number" min="60" max="100"
                    defaultValue={mark}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setMark(e.target.value)
                    }}
                    // deafaltValue={a}
                    placeholder={a}
                // placeholder="הכנס ציון:"
                /></td>
                {/* <td className="td2"> <button onClick={() => postMark(props.student._id, mark, props.lesson)}> */}
                 <button  className="sendBtn" onClick={() => postMark()}>
                    לעדכון
                </button>
            </tr>
       
    )

}


const mapStateToProps = (state) => {
    return {
        id: state.user?.user?._id,
        fname: state.user?.user?.firstName,
    };
};
export default connect(mapStateToProps, {})(MarkToUpdate);


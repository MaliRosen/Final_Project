import React, { useState, useEffect } from 'react';
import MainMenu from '../teacherMainMenu';
import { getAllStudentsFromServer } from '../../services/getAllStudent';
import { viewTestsFromServer } from '../../services/viewTests';
import { getAllLessonsFromServer } from '../../services/getAllLessons';
import { getAllMarksFromServer } from '../../services/getAllMarks';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MarkToUpdate from './markToUpdate';
// import Table from './table';

const Tasks = (props) => {

  const [students, setStudents] = useState([]);
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);
  const [mark, setMark] = useState('');
  const [title, setTitle] = useState('');
  let res = "";
  let res2 = "";

  const [lessons, setLessons] = useState([]);
  const [lessHw, setLessHw] = useState('');
  const [marks, setMarks] = useState([]);
  const [tests, setTests] = useState([]);
  const [ts, setTs] = useState([]);
  const [oneTst, setOneTst] = useState();

  useEffect(async () => {
    if(props.subject){
    getAllStudentsFromServer(props.subject).then((data) => {
      setStudents(data)
      console.log("getAllStudentsFromServer", data);
    })
  }
  }, [props.subject])

  useEffect(async () => {
    if(props.subject){
    viewTestsFromServer(props.subject).then((data) => {
      setTests(data);
      console.log("viewTestsFromServer", data);
    })
  }
  }, [props.subject])
  useEffect(async () => {
    if(props.subject){
    getAllLessonsFromServer(props.subject).then((data) => {
      setLessons(data);
      console.log("getAllLessonsFromServer", lessons);
    })
    }
  }, [props.subject])


    ;
  // const getAllMarks = async (subject) => {
  //   try {
  //     res2 = await getAllMarksFromServer(subject);
  //     console.log("----all Marks----", res2);
  //     setMarks(res2);

  //   }
  //   catch (error) {
  //     console.log("error", error);
  //     alert(" נכשל😒");
  //   }
  // }
  // ----------------------------------------------------------------





  console.log("students", students);

  return (<div>
    
    <MainMenu />
    {/* <Table></Table> */}
    {
      <table>
        <thead>
          {students?.map(s => (
            <tr>
              <td > {s?.firstName}</td>
            </tr>
          ))}
        </thead>
        <tbody>
        {tests?.map(t => (
          <>
            <tr className="td1"> {t?.nameSubject}</tr>
            <tr>
            </tr>
          </>
        ))}
        </tbody>
      </table>
    }
  </div>
  );
}
const mapStateToProps = (state) => {
  return {
    id: state.user?.user?._id,
    fname: state.user?.user?.firstName,
    subject: state.user?.user?.subject,
  };

};
export default connect(mapStateToProps, {})(Tasks);



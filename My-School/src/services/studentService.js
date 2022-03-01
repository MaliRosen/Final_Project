import {  useSelector, useDispatch } from "react-redux";


export const useStudentService=()=>{
const student= useSelector(state=> state.user.user);
const dispatch= useDispatch();

const post=(url, body, action)=>{
    fetch(`http://localhost:3000/${url}/${student._id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res=>res.json())
    .then(data=>{
        dispatch({type:action, payload:data})
    })
  }

  return {post}
}
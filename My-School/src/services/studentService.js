import {  useSelector, useDispatch } from "react-redux";


export const useStudentService=()=>{
const student= useSelector(state=> state.user.user);
const dispatch= useDispatch();

const showLoader= () => {
  dispatch({ type: "set-loader", payload:true})
}
const hideLoader= () => {
  dispatch({ type: "set-loader", payload:false})
}
const post=(url, body, action)=>{
  showLoader();
    fetch(`http://localhost:3000/${url}/${student._id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res=>res.json())
    .then(data=>{
      hideLoader();
        dispatch({type:action, payload:data})
    })
  }

  
const get=(url, body, action)=>{
  showLoader();
return  fetch(`http://localhost:3000/${url}/${student._id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res=>res.json())
  .then(data=>{
    hideLoader();
    if(action)  dispatch({type:action, payload:data})
    return data
  })
}
return {post, get}
}
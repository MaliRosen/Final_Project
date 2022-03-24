
export const getAllSubjectsFromServer = () => {
    return fetch(`http://localhost:3001/teacher/allLessons`)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

export const subscribeToLesson=(subject)=>{
  fetch(`http://localhost:3001/lesson/subscribe`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    subject
    })
  })
}
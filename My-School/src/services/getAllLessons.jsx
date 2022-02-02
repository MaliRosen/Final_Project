
export const getAllLessonsFromServer = (subject) => {
  if(!subject){console.log('error');return}
    return fetch(`http://localhost:3000/lesson/allLessons?subject=${subject}`)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

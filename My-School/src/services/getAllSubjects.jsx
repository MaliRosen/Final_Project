
export const getAllSubjectsFromServer = () => {
    return fetch(`http://localhost:3000/teacher/allTeachers`)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

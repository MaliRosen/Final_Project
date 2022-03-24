
export const getAllAttendanceFromServer = (subject) => {
    return fetch(`http://localhost:3001/lesson/allAttendance/`+subject)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

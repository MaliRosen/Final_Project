
export const getAllAttendanceFromServer = () => {
    return fetch(`http://localhost:3000/lesson/allAttendance`)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

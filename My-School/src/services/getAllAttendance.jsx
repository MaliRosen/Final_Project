
export const getAllAttendanceFromServer = () => {
    return fetch(`/lesson/allAttendance`)
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

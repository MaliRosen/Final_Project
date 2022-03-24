
export const getAllScheduleFromServer = (subject) => {
  return fetch(`http://localhost:3001/lesson/allLessons?subject=${subject}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    }
    )
    .catch((err) => {
      console.log("error", err);
    });
}


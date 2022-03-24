
export const getAllStudentsFromServer = (subject) => {
    return fetch(`http://localhost:3001/allBysubject?subject=${subject}`, {
      // credentials: "include"
    })
    .then((res) => res.json())
    .then((data) =>{ 
      return data;
                 }
     )
    .catch((err) => {
      console.log("error", err);
    });
}

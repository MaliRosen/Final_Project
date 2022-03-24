// export const newLessonToServer=(numLesson, lessonName,file,date,notes,time) => {
//     fetch(`http://localhost:3001/postLesson?numLesson=${numLesson}?lessonName=${lessonName}?file=${file}?date=${date}?notes=${notes}?time=${time}`)
//     .then((res) => res.json())
//     .then((data) =>{ console.log(data);
//            return data;}
//      )
//     .catch((err) => {
//       console.log("error", err);
//     });
// }

export const newLessonToServer=(data) => {
fetch('http://localhost:3001/lesson/postLesson/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  ...data
  })
}).then(res=>{alert("lesson send to server👍👍👍");})
.catch((err) => {console.log('fetch faild error: ' + err); alert(" נכשל😒");})
}
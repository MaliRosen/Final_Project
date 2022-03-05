export const postMarkToServer = ( type, studentId, mark, lessonId,) => {
  fetch(`/${type}/postMark`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      studentId,
      mark,
      lessonId,
    })
  });
}

export const postMyFileToServer = (data) => {
  // 
  fetch('/test/postFile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data
    })
  });
}

// export const postMyFileToServer = (type, lessonId,studentId, file) => {
//   
//   fetch('/postFile', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       type,
//       lessonId,
//       studentId,
//       file,
//     })
//   });
// }


// export const postMyTestFileToServer = (lessonId,studentId, file) => {
//   fetch('/postFile', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       lessonId,
//       studentId,
//       file,
//     })
//   });
// }
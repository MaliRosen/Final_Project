export const postMarkToServer = ( type, studentId, mark, lessonId,) => {
  fetch(`http://localhost:3001/${type}/postMark`, {
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

export const postMyFileToServer = async(data) => {
  // 
  await fetch('http://localhost:3001/test/postFile', {
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
//   fetch('http://localhost:3001/postFile', {
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
//   fetch('http://localhost:3001/postFile', {
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
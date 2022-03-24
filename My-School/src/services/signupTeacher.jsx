export const signupTeacherToServer = (newTeacher) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/teacher/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTeacher)
    }).then(res => res.json())
    .then(data => {
      if (data.status == 500) {
        reject(data)
      } else {
        resolve(data)
      }
    })
  })
}

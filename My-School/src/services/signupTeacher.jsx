export const signupTeacherToServer=(subject,firstName, lastName, id, email, password,arrMarks,arrAttendance) => {
    fetch('http://localhost:3000/teacher/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject,
        firstName,
        lastName,
        id,
        email,
        password,
        arrMarks,
        arrAttendance
      })
    });
    }
export const attendanceToServer = (d, userId, sub) => {
  fetch('http://localhost:3000/lesson/attendance', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      d,
      userId,
      sub

    })
  });
}
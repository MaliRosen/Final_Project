export const signupToServer = (newUser) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then(data => {
        if (data.status == 500) {
          reject(data)
        } else {
          resolve(data)
        }
      })
      .catch(err => reject(err))
  })
}
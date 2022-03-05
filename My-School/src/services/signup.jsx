export const signupToServer=(subject,firstName, lastName, id, email, password) => {
  return  fetch('/users/signup', {
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
        password
      })
    }).then((res) => res.json())
    .then(data=>{;return data})
    .catch(err=>console.log(err))
    }
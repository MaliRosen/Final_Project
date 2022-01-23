export const loginToServer = (user, password) => {
  return fetch(`http://localhost:3000/users/login?user=${user}&password=${password}`)
    .then((res) => res.json())
    .then((data) => {
      // let date = new Date(Date.now() + 86400e3);
      // date = date.toUTCString();
      // document.cookie = `jwt=${data.token};expires=${date};path=/`;
      return data;
    }
    )
    .catch((err) => {
      console.log("error", err);
    });
}

export const loginWithToken = (id,token) => {
  return fetch(`http://localhost:3000/users/loginWithToken` ,{
    method:'POST',
    body:JSON.stringify({id:id,token:token}),
    headers: {
      'Content-Type': 'application/json'
    }  })
    .then((res) => res.json())
    .then((data) => {
      // let date = new Date(Date.now() + 86400e3);
      // date = date.toUTCString();
      // document.cookie = `jwt=${data.token};expires=${date};path=/`;
      return {...data.result, type:data.kind};
    }
    )
    .catch((err) => {
      console.log("error", err);
    });
}


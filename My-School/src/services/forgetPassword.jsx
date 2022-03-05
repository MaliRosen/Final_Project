export const forgetPassword = (email, password) => {
    fetch('/users/forgetPassword', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
}
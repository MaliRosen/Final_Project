export const mailToServer = (email,name) => {
    fetch('http://localhost:3001/mail', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            name
        })
    });
}
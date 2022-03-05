export const mailToServer = (email,firstName) => {
    fetch('/mail', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            email,
            firstName

        })
    });
}
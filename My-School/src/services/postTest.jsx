export const postTestToServer = (data) => {
    
    fetch('http://localhost:3001/test/postTest', {
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

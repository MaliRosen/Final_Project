// export const postTestToServer = (teacher, nameSubject, date, file, comment,subject) => {
//     fetch('/postTest', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//            teacher, nameSubject, date, file, comment,subject
//         })
//     });
// } 

 
export const postTestToServer = (data) => {
    
    fetch('/test/postTest', {
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
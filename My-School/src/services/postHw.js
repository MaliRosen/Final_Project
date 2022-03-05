export const postHwToServer = (data) => {
    
    return fetch('/postHw', {
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

export const postHwAnswerToServer=({lessonId, studentId, file})=>{
    return fetch('/lesson/postHwAnswer',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lessonId, studentId, file
         })      
    })
}
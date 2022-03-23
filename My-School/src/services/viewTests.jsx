export const viewTestsFromServer = (subject) => {
    return fetch(`http://localhost:3000/test/allTests/${subject}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        }
        )
        .catch((err) => {
            console.log("error", err);
        });
}

export const viewMyTestsFromServer = (subject,id ) => {
    if(!subject || !id){console.log('error'); return;}
    return fetch(`http://localhost:3000/test/myTests?subject=${subject}&id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        }
        )
        .catch((err) => {
            console.log("error", err);
        });
}

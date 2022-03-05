export const viewTestsFromServer = (subject) => {
    return fetch(`/test/allTests?subject=${subject}`)
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
    return fetch(`/test/myTests?subject=${subject}&id=${id}`)
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

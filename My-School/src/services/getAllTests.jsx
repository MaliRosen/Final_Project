
export const getAllTestsFromServer = (subject) => {
    return fetch(`/test/allTests?subject=${subject}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        }
        )
        .catch((err) => {
            console.log("error", err);
        });
}

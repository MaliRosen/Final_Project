export const previousLessonToServer = (subject) => {
    if(!subject){console.log('error'); return;}
    return fetch(`/lesson/s_previousLessons/` + subject)
        .then((res) => res.json())
        .then((data) => {
            return data.result;
        }
        )
        .catch((err) => {
            console.log("error", err);
        });

}

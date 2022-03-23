import { useSelector, useDispatch } from "react-redux";

export const useMySchoolService = () => {
  const dispatch = useDispatch();

  const showLoader = () => {
    dispatch({ type: "set-loader", payload: true });
  };
  const hideLoader = () => {
    dispatch({ type: "set-loader", payload: false });
  };
  const post = (url, params, body, action) => {
    return new Promise((resolve, reject) => {
      showLoader();
      fetch(`http://localhost:3000/${url}/${params}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          hideLoader();
          if (action) dispatch({ type: action, payload: data });
          resolve(data);
        })
        .catch((err) => {
          hideLoader();
          reject(err)
        });
      });
  };

  const _delete = (url, params) => {
    return new Promise((resolve, reject) => {
      showLoader();
      fetch(`http://localhost:3000/${url}/${params}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          hideLoader();
          resolve(data);
        })
        .catch((err) => {
          hideLoader();
          reject(err)
        });
      });
  };

  const get = (url, params, action) => {
    return new Promise((resolve, reject) => {
      showLoader();
      return fetch(`http://localhost:3000/${url}/${params || ''}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          hideLoader();
          if (action) dispatch({ type: action, payload: data });
          resolve(data);
        })
        .catch((err) => {
          hideLoader();
          reject(err)
        });
    });
  };
  return { post, get, delete:_delete };
};

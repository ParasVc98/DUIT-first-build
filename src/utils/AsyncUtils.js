export const fetchDataHandler = (url, options = {}) => {

    return fetch(url, options).then(response => response.json());
};
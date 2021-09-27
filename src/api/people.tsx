export const API_URL = 'https://mate-academy.github.io/react_people-table/api';

export const request = (url: any, options: any = {}) => {
  return fetch(`${API_URL}${url}`, options)
    .then(res => res.json());
};

export const getPeople = () => request('/people.json');

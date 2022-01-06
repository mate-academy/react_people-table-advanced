const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

const request = (endpoint: string, option?: RequestInit) => (
  fetch(`${BASE_URL}${endpoint}`, option)
    .then(response => {
      return response.ok
        ? response.json()
        : Promise.reject(new Error('error'));
    })
);

export const getPeople = () => request('/people.json');

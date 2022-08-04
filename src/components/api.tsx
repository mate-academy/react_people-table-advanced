const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/';

export const getUsers = () => {
  return fetch(`${BASE_URL}/people.json`)
    .then(response => response.json());
};

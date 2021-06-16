const api = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getUsers = (options = {}) => (
  fetch(api, options)
    .then(response => response.json())
);

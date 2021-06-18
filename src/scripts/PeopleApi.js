const api = 'https://mate-academy.github.io/react_people-table/api/people.json';

const query = (url, options = {}) => (
  fetch(api, options)
);

export const getUsers = () => (
  query(api)
    .then(response => response.json())
    // eslint-disable-next-line no-console
    .catch(console.log)
);

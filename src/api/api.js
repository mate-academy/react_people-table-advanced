const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const request = () => fetch(BASE_URL)
  .then(response => response.json());

export const getPeople = () => request();

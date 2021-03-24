const PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => fetch(PEOPLE_URL)
  .then(response => response.json());

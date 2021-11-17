/* eslint-disable arrow-body-style */
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = () => {
  return fetch(`${BASE_URL}/people.json`)
    .then(people => people.json());
};

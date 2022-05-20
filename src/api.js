/* eslint-disable */
const baseUrl= 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => {
  return fetch(baseUrl)
    .then(response => response.json());
};
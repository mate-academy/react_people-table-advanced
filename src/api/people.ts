import { Person } from '../types';

// eslint-disable-next-line
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(API_URL)
    .then(response => response.json());
};

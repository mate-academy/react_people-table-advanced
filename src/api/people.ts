import { Person } from '../types/Person';

export const getPeople = (): Promise<Person[]> => {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  ).then(response => response.json());
};

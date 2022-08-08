import { Person } from './types/Person';

export const BASE_URL
= 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(BASE_URL).then(result => result.json());
};

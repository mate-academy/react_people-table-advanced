import { Person } from './types/Person';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople(): Promise<Person[]> {
  return fetch(API_URL)
    .then(people => people.json());
}

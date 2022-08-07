import { Person } from './types/Person';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople(): Promise<Person[]> {
  return fetch(URL)
    .then(res => res.json());
}

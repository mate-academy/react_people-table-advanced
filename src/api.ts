import { Person } from './types/Person';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople(): Promise<Person[]> {
  return fetch(url)
    .then(r => r.json());
}

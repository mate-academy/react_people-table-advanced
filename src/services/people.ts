import { Person } from '../types';

export function getPeople(): Promise<Person[]> {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  )
    .then(response => response.json())
    .then(people => people);
}

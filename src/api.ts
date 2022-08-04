import { Person } from './types/Person';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(url))
    .then(r => r.json());
}

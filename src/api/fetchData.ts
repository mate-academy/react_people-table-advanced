import { Person } from '../types/Person';

// eslint-disable-next-line max-len
const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getData(): Promise<Person[]> {
  return fetch(BASE_URL).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Something went wrong');
  });
}

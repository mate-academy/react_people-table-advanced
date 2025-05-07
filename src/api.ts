import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getSlug = (name: string, born: number) => {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${born}`;
};

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

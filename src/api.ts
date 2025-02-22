import { Person } from './types';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(handleResponse);
}

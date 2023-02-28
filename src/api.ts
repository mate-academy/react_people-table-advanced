import { Person } from './types';

const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  await wait(500);
  const response = await fetch(API_URL);

  return response.json();
}

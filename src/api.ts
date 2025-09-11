import { Person } from './types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  await wait(500);

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch people: ${response.status}`);
  }

  return response.json();
}

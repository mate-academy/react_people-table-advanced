import { Person } from '../types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to load people');
  }

  return response.json();
};

import { Person } from './types/Person';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getPeople = async (): Promise<Person[]> => {
  await wait(500);

  let response;

  try {
    response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('People not found');
    }
  } catch (error) {
    throw new Error('Can\'t fatch people from server');
  }

  return response.json();
};

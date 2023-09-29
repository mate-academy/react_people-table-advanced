import { Person } from './types';
import { PEOPLE_DOWNLOAD_ERROR } from './utils/constants';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  await wait(500);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(PEOPLE_DOWNLOAD_ERROR);
    }

    return await response.json();
  } catch (error) {
    throw new Error(PEOPLE_DOWNLOAD_ERROR);
  }
}

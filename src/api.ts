import { Person } from './types/Person';
import { API_URL, ERROR_MESSAGE } from './utils/constants';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  await wait(500);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    return await response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
}

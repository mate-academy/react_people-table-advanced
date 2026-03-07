import { URL } from '../constants/constants';
import { Person } from '../types';
export const getPeople = (): Promise<Person[]> => {
  return fetch(URL)
    .then(response => response.json())
    .catch(() => {
      throw new Error('Something went wrong');
    });
};

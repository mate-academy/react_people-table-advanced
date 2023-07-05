import { Person } from '../types';

const API_URL = process.env.REACT_APP_API_URL || '';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(300)
    .then(() => fetch(API_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

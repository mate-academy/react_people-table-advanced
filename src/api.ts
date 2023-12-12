import { Person } from './types';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';
const PEOPLE_PATH = '/people.json';
const API_URL = BASE_URL + PEOPLE_PATH;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

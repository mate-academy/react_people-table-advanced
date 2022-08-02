import { People } from '../types/People';

const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

function get<T>(): Promise<T> {
  return fetch(BASE_URL)
    .then(response => {
      return (response.json());
    });
}

export const getPeople = (): Promise<People[]> => {
  return get();
};

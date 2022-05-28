import { Human } from '../types/Human';

const baseURL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = async (): Promise<Array<Human>> => {
  const response = await fetch(`${baseURL}/people.json`);

  return response.json();
};

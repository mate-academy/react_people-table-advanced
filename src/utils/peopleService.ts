import { Person } from '../types';

const URL = './api/people.json';

export const retrievePeople: () => Promise<Person[]> = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error();
  }

  // throw new Error('VERY BAD ERROR');

  const people = await response.json();

  return people;
};

export const peopleService = {
  retrievePeople,
};

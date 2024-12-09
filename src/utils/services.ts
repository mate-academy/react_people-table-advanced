import { Person } from '../types';

export const getCenturiesList = (people: Person[]) => {
  const centuriesSet = new Set(
    people.map(person => String(Math.ceil(person.born / 100))),
  );

  return Array.from(centuriesSet).sort();
};

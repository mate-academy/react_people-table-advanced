import { Person } from '../types';

export const filterByCenturies = (
  people: Person[],
  centuries: string[],
): Person[] => {
  return people.filter(person => {
    const centuryOfBorn = Math.ceil(person.born / 100);

    return centuries.includes(centuryOfBorn.toString());
  });
};

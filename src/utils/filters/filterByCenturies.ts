import { Person } from '../../types';

export const filterByCenturies = (
  people: Person[],
  centuries: string[],
): Person[] => {
  if (!centuries.length) {
    return people;
  }

  return people.filter(person =>
    centuries.includes(Math.ceil(person.born / 100).toString()),
  );
};

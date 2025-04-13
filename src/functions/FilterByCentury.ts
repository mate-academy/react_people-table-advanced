import { Person } from '../types';

export const filterByCentury = (
  people: Person[],
  centuries: string[],
): Person[] =>
  people.filter(person => {
    const bornCentury = Math.ceil(person.born / 100);

    return centuries.includes(bornCentury.toString());
  });

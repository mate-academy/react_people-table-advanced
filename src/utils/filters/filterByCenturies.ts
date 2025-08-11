import { Person } from '../../types';

export const filterByCenturies = (
  people: Person[],
  centuries: string[] | null,
) => {
  if (!centuries || centuries.length === 0) {
    return people;
  }

  return people.filter(person => {
    if (!person.born) {
      return false;
    }

    const personCentury = Math.ceil(person.born / 100);

    return centuries.includes(personCentury.toString());
  });
};

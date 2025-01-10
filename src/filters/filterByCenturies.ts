import { Person } from '../types';

export const filtrerByCenturies = (
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

    const century = Math.ceil(person.born / 100).toString();

    return centuries.includes(century);
  });
};

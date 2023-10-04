import { Person } from '../types';

export function getPreparedPeople(people: Person[]) {
  return people.map((person) => {
    const mother = people
      .find(({ name }) => name === person.motherName);
    const father = people
      .find(({ name }) => name === person.fatherName);

    return { ...person, mother, father };
  });
}

export function getSortPeople(
  a: string | number,
  b: string | number,
  orderOfSort: string | null,
) {
  if (typeof a === 'string'
  && typeof b === 'string'
  && orderOfSort === null) {
    return a.localeCompare(b);
  }

  if (typeof a === 'string'
  && typeof b === 'string'
  && orderOfSort === 'desc') {
    return b.localeCompare(a);
  }

  if (typeof a === 'number'
  && typeof b === 'number'
  && orderOfSort === null) {
    return a - b;
  }

  return (b as number) - (a as number);
}

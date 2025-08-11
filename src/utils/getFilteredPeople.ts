import { Person } from '../types';
import { Sex } from '../types/sex';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[] | null,
) => {
  let peopleCopy = [...people];
  const normalizedQuery = query?.toLowerCase();

  if (sex === Sex.Male) {
    peopleCopy = people.filter(person => person.sex === 'm');
  } else if (sex === Sex.Female) {
    peopleCopy = people.filter(person => person.sex === 'f');
  }

  if (normalizedQuery) {
    peopleCopy = peopleCopy.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (centuries?.length) {
    peopleCopy = peopleCopy.filter(person => {
      const centuryValue = String(Math.ceil(person.born / 100));

      return centuries.includes(centuryValue);
    });
  }

  return peopleCopy;
};

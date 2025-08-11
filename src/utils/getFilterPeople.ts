import { Person } from '../types';

export const getFilterPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[] | null,
) => {
  let peopleCopy = [...people];
  const normalizedQuery = query?.toLowerCase();

  if (normalizedQuery) {
    peopleCopy = peopleCopy.filter(person => {
      const personName = person.name.toLowerCase();
      const personMotherName = person.motherName?.toLowerCase() || '';
      const personFatherName = person.fatherName?.toLowerCase() || '';

      return (
        personName.includes(normalizedQuery) ||
        personMotherName.includes(normalizedQuery) ||
        personFatherName.includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (centuries?.length) {
    peopleCopy = peopleCopy.filter(person => {
      const century = String(Math.ceil(person.born / 100));

      return centuries.includes(century);
    });
  }

  return peopleCopy;
};

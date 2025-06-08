import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[] | null,
) => {
  let peopleCopy = [...people];
  const normalizedQuery = query?.toLocaleLowerCase();

  peopleCopy = peopleCopy.filter(person => {
    const personName = person.name.toLocaleLowerCase();
    const personMotherName = person.motherName?.toLocaleLowerCase() || '';
    const personFatherName = person.fatherName?.toLocaleLowerCase() || '';
    const century = Math.floor(person.born / 100) + 1;

    return (
      (!normalizedQuery ||
        personName.includes(normalizedQuery) ||
        personMotherName.includes(normalizedQuery) ||
        personFatherName.includes(normalizedQuery)) &&
      (!sex || person.sex === sex) &&
      (!centuries?.length || centuries.includes(century.toString()))
    );
  });

  return peopleCopy;
};

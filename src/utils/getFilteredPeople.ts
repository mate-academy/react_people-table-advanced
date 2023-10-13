import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  centuries: string[],
  sex: string | null,
): Person[] => {
  return people.filter(person => {
    const normalizedQuery = query.replace(/\s/g, '').toLowerCase();
    const normalizedInfo = `${person.name}${person.motherName}${person.fatherName}`.toLowerCase();

    const isQueryMatch = !query || normalizedInfo.includes(normalizedQuery);

    const isCenturyMatch = !centuries.length || centuries.includes(
      String(Math.ceil(person.born / 100)),
    );

    const isSexMatch = !sex || person.sex === sex;

    return isQueryMatch && isCenturyMatch && isSexMatch;
  });
};

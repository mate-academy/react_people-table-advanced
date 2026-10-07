import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
): Person[] => {
  const normalizedName = (name: string | null) =>
    name?.toLowerCase().trim() || '';

  const normalizedQuery = normalizedName(query);

  return people.filter(person => {
    const matchesQuery =
      !normalizedQuery ||
      normalizedName(person.name).includes(normalizedQuery) ||
      normalizedName(person.motherName).includes(normalizedQuery) ||
      normalizedName(person.fatherName).includes(normalizedQuery);

    const matchesSex = sex === null || person.sex === sex;

    const personCentury = Math.ceil(person.born / 100);

    const matchesCenturies =
      centuries.length === 0 ||
      centuries.some(century => century === personCentury.toString());

    return matchesQuery && matchesSex && matchesCenturies;
  });
};

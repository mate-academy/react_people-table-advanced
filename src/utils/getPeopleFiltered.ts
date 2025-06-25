import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string,
): Person[] => {
  const normalizedQuery = query.toLowerCase().trim();

  let filteredPeople = [...people];

  filteredPeople = people.filter(
    ({ motherName, fatherName, name }) =>
      name.toLowerCase().includes(normalizedQuery) ||
      motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
      fatherName?.toLowerCase().includes(normalizedQuery),
  );

  return filteredPeople;
};

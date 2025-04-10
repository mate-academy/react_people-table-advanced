import { Person } from '../types';

type FilterOptions = {
  query: string;
  centuries: number[];
  sex: string | null;
};

export const getFilteredPeople = (
  people: Person[],
  options: FilterOptions,
): Person[] => {
  const { query, centuries, sex } = options;

  return people.filter(person => {
    const lowerQuery = query.toLowerCase();
  
    const matchesQuery =
      person.name.toLowerCase().includes(lowerQuery) ||
      person.motherName?.toLowerCase().includes(lowerQuery) ||
      person.fatherName?.toLowerCase().includes(lowerQuery);
  
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(Math.floor(person.born / 100) + 1);
  
    const matchesSex =
      !sex || sex === 'all' || person.sex === sex;
  
    return matchesQuery && matchesCentury && matchesSex;
  });
};

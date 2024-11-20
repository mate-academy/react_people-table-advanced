import { Person } from '../types';
import { SexFilter } from '../types/SexFilter';

export const getFilteredPeople = (
  people: Person[],
  filters: {
    sex: string;
    query: string;
    centuries: string[];
  },
) => {
  const filteredPeople = people.filter(person => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    const century = Math.ceil(person.born / 100).toString();

    const neededSex =
      person.sex === filters.sex || filters.sex === SexFilter.ALL;

    const neededCentury =
      filters.centuries.includes(century) || !filters.centuries.length;

    const allNeededSearchQuery = [
      person.name,
      person.fatherName,
      person.motherName,
    ];

    const isIncludesInNames = allNeededSearchQuery.some(searchQuery =>
      searchQuery?.toLowerCase().includes(normalizedQuery),
    );

    return neededSex && neededCentury && isIncludesInNames;
  });

  return filteredPeople;
};

import { FilterService } from '../types/FiltersService/FilterService';
import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  filters: FilterService,
): Person[] => {
  const { query, sexFilter, centuryFilter } = filters;

  const normalizedQuery = query.toLowerCase().trim();
  const hasQuery = normalizedQuery !== '';
  const hasSexFilter = sexFilter !== null;
  const hasCenturyFilter = centuryFilter.length > 0;

  return people.filter(person => {
    const matchesQuery =
      !hasQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = !hasSexFilter || person.sex === sexFilter;

    const birthCentury = Math.floor(person.born / 100) + 1;
    const matchesCentury =
      !hasCenturyFilter || centuryFilter.includes(birthCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });
};

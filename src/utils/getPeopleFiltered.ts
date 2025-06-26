import { FilterService } from '../types/FiltersService/FilterService';
import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  filters: FilterService,
): Person[] => {
  const { query, sex, centuries } = filters;

  const normalizedQuery = query.toLowerCase().trim();
  const hasQuery = normalizedQuery !== '';
  const hasSexFilter = sex !== null;
  const hasCenturyFilter = centuries.length > 0;

  return people.filter(person => {
    const matchesQuery =
      !hasQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = !hasSexFilter || person.sex === sex;

    const birthCentury = Math.floor(person.born / 100) + 1;
    const matchesCentury =
      !hasCenturyFilter || centuries.includes(String(birthCentury));

    return matchesQuery && matchesSex && matchesCentury;
  });
};

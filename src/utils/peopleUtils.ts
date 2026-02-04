import { Person, FiltersProps, KeyProps } from '../types';

export function filterAndSortPeople(
  people: Person[],
  filters: FiltersProps,
  sortKey: KeyProps,
  sortOrder: 'asc' | 'desc',
) {
  return people
    .filter(p => {
      if (filters.sexFilter && p.sex !== filters.sexFilter) {
        return false;
      }

      if (filters.queryFilter) {
        const query = filters.queryFilter.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query);

        if (!matches) {
          return false;
        }
      }

      if (filters.centuryFilter.length > 0) {
        const century = Math.floor(p.born / 100) + 1;

        if (!filters.centuryFilter.includes(century)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortKey) {
        return 0;
      }

      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === 'string' && typeof valB === 'string') {
        const res = valA.localeCompare(valB);

        return sortOrder === 'asc' ? res : -res;
      }

      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
}

import { Person } from '../types';

export function sortPeople(
  toSort: Person[],
  sortBy: keyof Person,
  sortOrder: string | null,
) {
  return sortBy
    ? toSort.sort((a, b) => {
      const aValue = sortOrder === 'asc' ? a[sortBy] : b[sortBy];
      const bValue = sortOrder === 'asc' ? b[sortBy] : a[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return 0;
    })
    : toSort;
}

import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortKey: keyof Person | '',
  sortOrder: 'asc' | 'desc' | '',
): Person[] => {
  if (!sortKey || sortOrder === '') {
    return people;
  }

  return [...people].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    switch (typeof valueA) {
      case 'string':
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB as string)
          : (valueB as string).localeCompare(valueA);
      case 'number':
        return sortOrder === 'asc'
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      default:
        return 0;
    }
  });
};

export const getSortIconClass = (
  key: keyof Person,
  sortKey: keyof Person | '',
  sortOrder: 'asc' | 'desc' | '',
): string => {
  switch (true) {
    case sortKey !== key || sortOrder === '':
      return 'fas fa-sort';
    case sortKey === key && sortOrder === 'asc':
      return 'fas fa-sort-up';
    case sortKey === key && sortOrder === 'desc':
      return 'fas fa-sort-down';
    default:
      return 'fas fa-sort';
  }
};

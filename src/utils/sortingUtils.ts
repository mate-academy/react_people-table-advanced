import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortBy: keyof Person | '',
  sortOrder: 'asc' | 'desc' | '',
): Person[] => {
  if (!sortBy || !sortOrder) {
    return people;
  }

  return [...people].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    switch (typeof valueA) {
      case 'string':
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB as string)
          : (valueB as string).localeCompare(valueA);

      case 'number':
        return sortOrder === 'asc'
          ? valueA - (valueB as number)
          : (valueB as number) - valueA;

      default:
        return 0;
    }
  });
};

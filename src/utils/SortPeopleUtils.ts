import { Person } from '../types';
import { SortOrder } from '../types/Order';

export const sortPeople = (
  people: Person[],
  sortField: string,
  sortOrder: SortOrder,
): Person[] => {
  const sorted = [...people];

  sorted.sort((a, b) => {
    const aValue = a[sortField as keyof Person] ?? '';
    const bValue = b[sortField as keyof Person] ?? '';

    if (sortOrder === SortOrder.Ascending) {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return sorted;
};

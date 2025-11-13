import { Person } from '../types/Person';

type SortField = 'name' | 'sex' | 'born' | 'died';

export function applySort(
  people: Person[],
  sort: string,
  order: string,
): Person[] {
  if (!sort) {
    return people;
  }

  const sortedPeople = [...people];
  const field = sort as SortField;

  sortedPeople.sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return -1;
    }

    if (aValue > bValue) {
      return 1;
    }

    return 0;
  });

  if (order === 'desc') {
    return sortedPeople.reverse();
  }

  return sortedPeople;
}

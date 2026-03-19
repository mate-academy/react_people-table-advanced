import { Person } from '../types';

export type SortField = 'name' | 'sex' | 'born' | 'died';
export type SortOrder = 'asc' | 'desc' | undefined;

export function sortPeople(
  people: Person[],
  sortField: SortField | null,
  order: SortOrder | undefined,
): Person[] {
  if (!sortField) {
    return people;
  }

  const dir = order === 'desc' ? -1 : 1;

  return [...people].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
    }

    if (typeof bValue === 'string') {
      bValue = bValue.toLowerCase();
    }

    if (aValue == null && bValue == null) {
      return 0;
    }

    if (aValue == null) {
      return 1 * dir;
    }

    if (bValue == null) {
      return -1 * dir;
    }

    if (aValue > bValue) {
      return 1 * dir;
    }

    if (aValue < bValue) {
      return -1 * dir;
    }

    return 0;
  });
}

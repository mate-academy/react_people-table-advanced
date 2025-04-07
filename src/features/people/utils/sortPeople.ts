import { Person } from '../../../types';

interface Props {
  people: Person[];
  sortKey: keyof Person;
  order: 'desc' | null;
}

export const sortPeople = ({ people, sortKey, order }: Props): Person[] => {
  if (!sortKey) {
    return people;
  }

  return [...people].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue == null || bValue == null) {
      return aValue == null && bValue == null ? 0 : aValue == null ? 1 : -1;
    }

    if (aValue === bValue) {
      return 0;
    }

    return order === 'desc'
      ? aValue < bValue
        ? 1
        : -1
      : aValue > bValue
        ? 1
        : -1;
  });
};

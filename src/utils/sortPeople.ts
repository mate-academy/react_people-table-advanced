import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  if (!sort) {
    return people;
  }

  const sortedPeople = [...people];

  sortedPeople.sort((a, b) => {
    const first = a[sort as keyof Person];
    const second = b[sort as keyof Person];

    if (first == null) {
      return 1;
    }

    if (second == null) {
      return -1;
    }

    if (typeof first === 'string' && typeof second === 'string') {
      return first.localeCompare(second);
    }

    return Number(first) - Number(second);
  });

  return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
};

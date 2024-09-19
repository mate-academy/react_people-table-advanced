import { Person } from '../types';

interface SortPeopleOptions {
  sort: string | null;
  order: string | null;
}

export const SortPeople = (
  people: Person[],
  { sort, order }: SortPeopleOptions,
) => {
  if (!sort) {
    return people;
  }

  return [...people].sort((a, b) => {
    const keyA = a[sort as keyof Person];
    const keyB = b[sort as keyof Person];

    if (!keyA || !keyB) {
      return 0;
    }

    const isNumeric = !isNaN(+keyA) && !isNaN(+keyB);

    if (isNumeric) {
      const numberA = +keyA;
      const numberB = +keyB;

      if (order) {
        return numberB - numberA;
      }

      return numberA - numberB;
    }

    if (keyA < keyB) {
      return order ? 1 : -1;
    }

    return order ? -1 : 1;
  });
};

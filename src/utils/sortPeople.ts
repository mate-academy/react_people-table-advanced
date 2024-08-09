import { Person } from '../types';
import { Sort } from '../types/Sort';

export const sortPeople = (
  people: Person[],
  sort: Sort | null,
  order: string | null,
): Person[] => {
  if (!sort) {
    return people;
  }

  return [...people].sort((a, b) => {
    switch (sort) {
      case Sort.name:
      case Sort.sex:
        if (order) {
          return b[sort].localeCompare(a[sort]);
        }

        return a[sort].localeCompare(b[sort]);

      case Sort.born:
      case Sort.died:
        if (order) {
          return b[sort] - a[sort];
        }

        return a[sort] - b[sort];

      default:
        return 0;
    }
  });
};

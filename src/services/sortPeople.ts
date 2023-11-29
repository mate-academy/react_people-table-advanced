import { Person } from '../types';
import { SortParams } from '../types/SortParams';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  if (sort) {
    people.sort((a, b) => {
      switch (sort) {
        case SortParams.NAME:
        case SortParams.SEX:
          return a[sort].localeCompare(b[sort]);
        case SortParams.BORN:
        case SortParams.DIED:
          return a[sort] - b[sort];
        default: return 0;
      }
    });
  }

  if (order) {
    return people.reverse();
  }

  return people;
};

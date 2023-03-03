import { Person, SortBy } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: keyof Person | null,
  isReversed: boolean,
) => {
  let sortedPeople = [...people];

  if (sort) {
    sortedPeople = sortedPeople.sort((a, b) => {
      switch (sort) {
        case SortBy.Name:
        case SortBy.Sex:
          return a[sort].localeCompare(b[sort]);
        case SortBy.Born:
        case SortBy.Died:
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

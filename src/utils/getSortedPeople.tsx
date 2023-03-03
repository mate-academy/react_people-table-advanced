import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: keyof Person | null,
  order: boolean,
) => {
  let sortedPeople = [...people];

  if (sort) {
    sortedPeople = sortedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

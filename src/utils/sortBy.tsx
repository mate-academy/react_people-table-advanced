import { Person } from '../types';

export const sortFunc = (
  people: Person[],
  sortBy: keyof Person,
  reverse: boolean,
) => {
  const sortPeople = [...people];

  if (sortBy) {
    sortPeople.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);

        case 'born':
        case 'died':
          return a[sortBy] - b[sortBy];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortPeople.reverse();
  }

  return sortPeople;
};

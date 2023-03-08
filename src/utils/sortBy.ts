import { Person } from '../types';

export const sortBy = (
  people: Person[],
  sortByField: keyof Person,
  reverse: boolean,
) => {
  const sortPeople = [...people];

  if (sortByField) {
    sortPeople.sort((a, b) => {
      switch (sortByField) {
        case 'name':
        case 'sex':
          return a[sortByField].localeCompare(b[sortByField]);

        case 'born':
        case 'died':
          return a[sortByField] - b[sortByField];

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

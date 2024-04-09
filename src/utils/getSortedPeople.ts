import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  column: string | null,
  order: string | null,
) => {
  if (!column && !order) {
    return people;
  }

  let sortedPeople = [...people];

  if (column) {
    sortedPeople = [...people].sort((item1, item2) => {
      switch (column) {
        case 'born':
        case 'died':
          return item1[column] - item2[column];
        case 'name':
        case 'sex':
          return item1[column].localeCompare(item2[column]);
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

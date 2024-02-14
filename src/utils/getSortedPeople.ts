import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  column: string | null,
  order: string | null,
) => {
  if (!column && !order) {
    return people;
  }

  let sortedPeople = people;

  if (column) {
    sortedPeople = [...people].sort((person1, person2) => {
      switch (column) {
        case 'born':
        case 'died':
          return person1[column] - person2[column];
        case 'name':
        case 'sex':
          return person1[column].localeCompare(person2[column]);
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

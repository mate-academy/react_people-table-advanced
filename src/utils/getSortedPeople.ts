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
    sortedPeople = [...people].sort((personA, personB) => {
      switch (column) {
        case 'born':
        case 'died':
          return personA[column] - personB[column];
        case 'name':
        case 'sex':
          return personA[column].localeCompare(personB[column]);
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

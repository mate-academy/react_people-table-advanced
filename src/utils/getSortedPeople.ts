import { Person } from '../types/Person';

export const getSortedPeople = (
  people: Person[],
  sortType: string | null,
  order: string | null,
): Person[] => {
  const sortedPeople = [...people];

  sortedPeople.sort((personA, personB) => {
    switch (sortType) {
      case 'name':
      case 'sex':
        return personA[sortType].localeCompare(personB[sortType]);

      case 'born':
      case 'died':
        return Number(personA[sortType]) - Number(personB[sortType]);

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

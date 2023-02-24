import { Person } from '../types';

export function getSortedPeople(
  people: Person[],
  sortBy: keyof Person | null,
  isReversed: boolean,
): Person[] {
  const sortedPeople = [...people];

  if (sortBy) {
    sortedPeople.sort((personA, personB) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return personA[sortBy].localeCompare(personB[sortBy]);
        case 'born':
        case 'died':
          return personA[sortBy] - personB[sortBy];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedPeople.reverse();
  }

  return sortedPeople;
}

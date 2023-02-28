import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortBy: keyof Person,
  reversed: string | null,
) => {
  const sortedPeople = [...people];

  if (sortBy) {
    sortedPeople.sort((a, b) => {
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

  if (reversed) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

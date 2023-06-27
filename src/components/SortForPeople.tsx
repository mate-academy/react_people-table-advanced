import { Person } from '../types';

export const SortForPeople = (
  filteredPeople: Person[],
  sortByField: string | null,
  isReversed: boolean,
) => {
  const copyPeople = [...filteredPeople];

  if (sortByField) {
    copyPeople.sort((a, b) => {
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

  if (isReversed) {
    copyPeople.reverse();
  }

  return copyPeople;
};

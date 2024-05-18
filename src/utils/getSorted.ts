import { Person } from '../types';
import { SortType } from '../types/SortType';

export const getSorted = (people: Person[], sorts: SortType) => {
  const sorted = people.sort((a, b) => {
    switch (sorts) {
      case 'name':
      case 'sex':
        return a[sorts].localeCompare(b[sorts]);
      case 'born':
      case 'died':
        return a[sorts] - b[sorts];
      default:
        return 0;
    }
  });

  return sorted;
};

import { Person } from '../types/Person';
import { SortType } from '../types/sortType';

export const getSortedPeople = (
  people: Person[],
  sort: string,
  order: string | null,
) => {
  const sortedPeople = [...people].sort((a, b) => {
    switch (sort) {
      case SortType.NAME:
        return a[sort].localeCompare(b[sort]);

      case SortType.SEX:
        return a[sort].localeCompare(b[sort]);

      case SortType.BORN:
      case SortType.DIED:
        return a[sort] - b[sort];

      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

import { Person } from '../types';
import { SortType } from '../types/SortType';

export const SortForPeople = (
  filteredPeople: Person[],
  sort: string | null,
  order: string,
) => {
  const copyPeople = [...filteredPeople];

  copyPeople.sort((a, b) => {
    switch (sort) {
      case SortType.NAME:
        return a.name.localeCompare(b.name);

      case SortType.SEX:
        return a.sex.localeCompare(b.sex);

      case SortType.BORN:
        return a.born - b.born;

      case SortType.DIED:
        return a.died - b.died;

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    copyPeople.reverse();
  }

  return copyPeople;
};

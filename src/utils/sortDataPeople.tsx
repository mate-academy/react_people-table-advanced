import { Person } from '../types/Person';
import { SortType } from './sortType';

export const sortDataPeople = (
  order: string | null,
  dataPeople: Person[],
  sortTitle: string,
) => {
  const sortedData = [...dataPeople].sort((a, b) => {
    switch (sortTitle) {
      case SortType.NAME:
        return a[sortTitle].localeCompare(b[sortTitle]);

      case SortType.SEX:
        return a[sortTitle].localeCompare(b[sortTitle]);

      case SortType.BORN:
      case SortType.DIED:
        return a[sortTitle] - b[sortTitle];

      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedData.reverse();
  }

  return sortedData;
};

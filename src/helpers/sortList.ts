import { Person } from '../types';
import { SortTypes } from '../enums/SortTypes';

export const sortList = (
  list: Person[],
  orderField: string,
  sortField: string,
) => {
  const copyList = [...list];

  copyList.sort((a, b) => {
    switch (sortField) {
      case SortTypes.Name:
      case SortTypes.Sex:
        return a[sortField].localeCompare(b[sortField]);
      case SortTypes.Born:
      case SortTypes.Died:
        return (a[sortField] as number) - (b[sortField] as number);
      default:
        return 0;
    }
  });

  if (orderField === 'desc') {
    copyList.reverse();
  }

  return copyList;
};

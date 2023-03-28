import { SortType } from '../enums/SortType';

export const getSortType = (type: string): SortType => {
  switch (type) {
    case SortType.Name:
      return SortType.Name;
    case SortType.Sex:
      return SortType.Sex;
    case SortType.Born:
      return SortType.Born;
    case SortType.Died:
      return SortType.Died;
    case SortType.None:
    default:
      return SortType.None;
  }
};

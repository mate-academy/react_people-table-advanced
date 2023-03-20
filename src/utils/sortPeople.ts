import { Person } from '../types';
import { SortField } from '../types/SortFiled';

export const sortPeople = (
  filteredPeople: Person[],
  sort: string | null,
  order: boolean,
) => {
  if (sort) {
    switch (sort) {
      case SortField.NAME:
      case SortField.SEX:
        return filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
      case SortField.DIED:
      case SortField.BORN:
        return filteredPeople.sort((a, b) => a[sort] - b[sort]);
      default:
        return filteredPeople;
    }
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

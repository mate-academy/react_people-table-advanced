import { Person } from '../types';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';

export const sortPeople = (
  people: Person[],
  sortField: SortField | null,
  order: SortOrder | null,
): Person[] => {
  if (!sortField || !order) {
    return people;
  }

  return people.sort((a, b) => {
    let aValue = a;
    let bValue = b;

    if (order === SortOrder.DESC) {
      [aValue, bValue] = [b, a];
    }

    switch (sortField) {
      case SortField.NAME:
        return aValue.name.localeCompare(bValue.name);
      case SortField.SEX:
        return aValue.sex.localeCompare(bValue.sex);
      case SortField.BORN:
        return aValue.born - bValue.born;
      case SortField.DIED:
        return aValue.died - bValue.died;
      default:
        return 0;
    }
  });
};

import { Person } from '../types';
import { SortField } from '../types/SortField';

export const sortPeople = (
  people: Person[],
  sortField: string | null,
  isReversed:boolean,
) => {
  if (sortField) {
    people.sort((a, b) => {
      switch (sortField) {
        case SortField.Name:
        case SortField.Sex:
          return a[sortField].localeCompare(b[sortField]);

        case SortField.Born:
        case SortField.Died:
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    people.reverse();
  }

  return people;
};

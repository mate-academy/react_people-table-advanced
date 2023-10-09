import { Person } from '../types';
import { SortField } from '../types/SortField';

export function getSortedPeople(
  people: Person[],
  sortField: string | null,
  order: string | null,
) {
  let copyPeople = [...people];

  if (sortField) {
    copyPeople = copyPeople.sort((person1, person2) => {
      switch (sortField) {
        case SortField.Name:
        case SortField.Sex:
          return person1[sortField].localeCompare(person2[sortField]);
        case SortField.Born:
        case SortField.Died:
          return person1[sortField] - person2[sortField];
        default:
          return 0;
      }
    });
  }

  if (order) {
    copyPeople.reverse();
  }

  return copyPeople;
}

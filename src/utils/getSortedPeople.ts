import { Person } from '../types';
import { SortKeys } from '../types/SortKeys';

export function getSortedPeople(
  people: Person[],
  sortBy: SortKeys,
  order: number,
) {
  const prepPeople = [...people];

  switch (sortBy) {
    case SortKeys.Born:
    case SortKeys.Died: {
      return prepPeople.sort((a, b) => (a[sortBy] - b[sortBy]) * order);
    }

    case SortKeys.Name:
    case SortKeys.Sex:
      return prepPeople.sort(
        ((a, b) => a[sortBy].localeCompare(b[sortBy]) * order),
      );

    default:
      return prepPeople;
  }
}

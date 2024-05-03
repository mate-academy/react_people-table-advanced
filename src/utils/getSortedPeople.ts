import { Person } from '../types';
import { Orders, SortKeys } from '../types/sortTypes';
import { normalize } from './stringManipulation';

type SortParams = {
  order: string;
  sort: string;
};

export const getSortedPeople = (people: Person[], params: SortParams) => {
  const { order, sort } = params;

  if (!sort) {
    return people;
  }

  const reverseMultiplier = order === Orders.Descending ? -1 : 1;

  return [...people].sort((a, b) => {
    switch (sort) {
      case SortKeys.Name:
      case SortKeys.Sex:
        return (
          reverseMultiplier * normalize(a.name).localeCompare(normalize(b.name))
        );
      case SortKeys.Born:
      case SortKeys.Died:
        return reverseMultiplier * (a[sort] - b[sort]);
      default:
        return 0;
    }
  });
};

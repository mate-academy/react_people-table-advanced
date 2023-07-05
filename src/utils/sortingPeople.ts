import { Person } from '../types';
import { SortOptions } from '../types/SortOptions';
import { SortDirections } from '../types/SortDirections';

export const SortingPeople = (
  people: Person[],
  option: SortOptions | null,
  direction: SortDirections | null,
) => {
  if (!option) {
    return people;
  }

  const sorted = [...people].sort((a, b) => {
    switch (option) {
      case SortOptions.Name:
      case SortOptions.Sex:
        return a[option].localeCompare(b[option]);

      case SortOptions.Born:
      case SortOptions.Died:
        return a[option] - b[option];

      default:
        return 0;
    }
  });

  return direction ? sorted.reverse() : sorted;
};

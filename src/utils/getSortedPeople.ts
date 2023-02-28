import { SortTypes } from '../types/SortTypes';
import { Person } from '../types';

export const getSortedPeople = (
  visiblePeople: Person[],
  sort: SortTypes,
  isReversed: boolean,
) => {
  if (sort) {
    visiblePeople.sort(
      (a, b) => {
        switch (sort) {
          case SortTypes.Name:
          case SortTypes.Sex:
            return a[sort].localeCompare(b[sort]);

          case SortTypes.Born:
          case SortTypes.Died:
            return a.born - b.born;

          default:
            return 0;
        }
      },
    );
  }

  if (isReversed) {
    visiblePeople.reverse();
  }
};

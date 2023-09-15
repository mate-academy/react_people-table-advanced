import { Person } from '../types';
import { SortTypes } from '../types/SortTypes';

export const peopleSort = (
  people: Person[],
  sortType: string | null,
  isReversed: boolean,
) => {
  let sortedPeople = [...people];

  if (sortType) {
    sortedPeople = sortedPeople.sort((p1, p2) => {
      switch (sortType) {
        case SortTypes.NAME:
        case SortTypes.SEX:
          return isReversed
            ? p2[sortType].localeCompare(p1[sortType])
            : p1[sortType].localeCompare(p2[sortType]);

        case SortTypes.BORN:
        case SortTypes.DIED:
          return isReversed
            ? p2[sortType] - p1[sortType]
            : p1[sortType] - p2[sortType];

        default:
          return 0;
      }
    });
  }

  return sortedPeople;
};

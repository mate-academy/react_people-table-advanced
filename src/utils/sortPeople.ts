import { Person } from '../types';
import { SortType } from '../types/SortType';

export const sortPeople = (
  people: Person[],
  sortType: string | null,
  isReversed: boolean,
) => {
  let sortedPeople = [...people];

  if (sortType) {
    sortedPeople = sortedPeople.sort((person1, person2) => {
      switch (sortType) {
        case SortType.Name:
        case SortType.Sex: {
          return isReversed
            ? person2[sortType].localeCompare(person1[sortType])
            : person1[sortType].localeCompare(person2[sortType]);
        }

        case SortType.Born:
        case SortType.Died: {
          return isReversed
            ? person2[sortType] - person1[sortType]
            : person1[sortType] - person2[sortType];
        }

        default:
          return 0;
      }
    });
  }

  return sortedPeople;
};

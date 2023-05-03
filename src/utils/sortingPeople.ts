import { Person } from '../types';
import { SortType } from '../types/SortType';

export const sortingPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  const sortedPeople = [...people];

  if (sort) {
    switch (sort) {
      case SortType.NAME:
      case SortType.SEX:
        sortedPeople.sort((prevPerson, nextPerson) => (
          prevPerson[sort].localeCompare(nextPerson[sort])
        ));
        break;

      case SortType.BORN:
      case SortType.DIED:
        sortedPeople.sort((prevPerson, nextPerson) => (
          prevPerson[sort] - nextPerson[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

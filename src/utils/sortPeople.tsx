import { Person } from '../types';
import { SortType } from '../types/SortType';

export const sortPeople = (
  people: Person[],
  sortParams: string,
  orderParams: string | null,
) => {
  const sortedPeople = [...people];

  switch (sortParams) {
    case SortType.Name:
      sortedPeople.sort(
        (person1, person2) => person1.name.localeCompare(person2.name),
      );
      break;

    case SortType.Sex:
      sortedPeople.sort(
        (person1, person2) => person1.sex.localeCompare(person2.sex),
      );
      break;
    case SortType.Born:
      sortedPeople.sort(
        (person1, person2) => person1.born - person2.born,
      );
      break;
    case SortType.Died:
      sortedPeople.sort(
        (person1, person2) => person1.died - person2.died,
      );
      break;

    default:
      break;
  }

  if (orderParams) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

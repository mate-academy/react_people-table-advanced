import { Person } from '../types';
import { SortEnum } from '../types/SortEnum';

export function sortPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  let sortedPeople = people;

  switch (sort) {
    case SortEnum.NAME:
    case SortEnum.SEX:
      sortedPeople = [...people].sort((x, y) => {
        return x[sort].localeCompare(y[sort]);
      });

      break;
    case SortEnum.BORN:
    case SortEnum.DIED:
      sortedPeople = [...people].sort((x, y) => {
        return +x[sort] - +y[sort];
      });

      break;
    default:
      break;
  }

  if (order) {
    return sortedPeople.reverse();
  }

  return sortedPeople;
}

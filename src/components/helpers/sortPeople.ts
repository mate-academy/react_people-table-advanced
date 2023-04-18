import { Person } from '../../types';
import { SortType } from '../enums/SortType';

export const sortPeople = (
  people: Person[],
  sortType: string | null,
  order: string | null,
) => {
  const sortedPeople = [...people];

  switch (sortType) {
    case SortType.Name:
    case SortType.Sex:
      sortedPeople.sort((a, b) => a[sortType].localeCompare(b[sortType]));
      break;

    case SortType.Born:
    case SortType.Died:
      sortedPeople.sort((a, b) => +a[sortType] - +b[sortType]);
      break;

    default:
      return people;
  }

  return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
};

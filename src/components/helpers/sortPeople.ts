import { Person } from '../../types';
import { SortType } from '../enums/SortType';

export const sortPeople = (
  people: Person[],
  sortType: string | null,
  order: string | null,
) => {
  switch (sortType) {
    case SortType.Name:
    case SortType.Sex:
      people.sort((a, b) => a[sortType].localeCompare(b[sortType]));
      break;

    case SortType.Born:
    case SortType.Died:
      people.sort((a, b) => +a[sortType] - +b[sortType]);
      break;

    default:
      break;
  }

  return order === 'desc' ? people.reverse() : people;
};

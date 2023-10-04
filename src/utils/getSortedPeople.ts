import { Person } from '../types';
import { SortType } from '../types/SortType';

export function getSortPreparedPeople(
  prepared: Person[],
  sort: string,
  order: string,
) {
  let visiblePeople = [...prepared];

  switch (sort) {
    case SortType.Name:
      visiblePeople = visiblePeople
        .sort((a, b) => a.name.localeCompare(b.name));
      break;

    case SortType.Sex:
      visiblePeople = visiblePeople
        .sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case SortType.Born:
      visiblePeople = visiblePeople
        .sort((a, b) => a.born - b.born);
      break;

    case SortType.Died:
      visiblePeople = visiblePeople
        .sort((a, b) => a.died - b.died);
      break;

    default:
      break;
  }

  if (order) {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
}

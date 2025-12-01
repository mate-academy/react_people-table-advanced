import { Person } from '../types';
import { SortTypes } from '../types/SortTypes';

export function sortPersons(p1: Person, p2: Person, sort: string) {
  switch (sort) {
    case SortTypes.Name:
      return p1.name.localeCompare(p2.name);

    case SortTypes.Sex:
      return p1.sex.localeCompare(p2.sex);

    case SortTypes.Born:
      return p1.born - p2.born;

    case SortTypes.Died:
      return p1.died - p2.died;

    default:
      return 0;
  }
}

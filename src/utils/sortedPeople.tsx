import { SortType } from '../types/SortType';
import { Person } from '../types/Person';

export function sortPeople(people: Person[], sort: string | number) {
  switch (sort) {
    case SortType.Name:
    case SortType.Sex:
      return people.sort((a, b) => a[sort].localeCompare(b[sort]));
    case SortType.Born:
    case SortType.Died:
      return people.sort((a, b) => a[sort] - b[sort]);
    default:
      return people;
  }
}

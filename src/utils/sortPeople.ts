import { Person } from '../types';
import { SortBy } from '../types/sortBy';

export function sortPeople(people: Person[], sortBy: SortBy) {
  return [...people].sort((a, b) => {
    switch (sortBy) {
      case SortBy.Name:
        return a.name.localeCompare(b.name);

      case SortBy.Sex:
        return a.sex.localeCompare(b.sex);

      case SortBy.Born:
        return a.born - b.born;

      case SortBy.Died:
        return a.died - b.died;

      default:
        return 0;
    }
  });
}

import { Person } from '../types';
import { SORT } from '../types/sort';
import { DIRECTION } from '../types/sortDirection';

export function sort(
  people: Person[],
  sortField: SORT,
  sortDirection: DIRECTION,
): Person[] {
  if (sortDirection === DIRECTION.NONE) {
    return [...people];
  }

  const multiplier = sortDirection === DIRECTION.ASC ? 1 : -1;

  return [...people].sort((p1, p2) => {
    switch (sortField) {
      case SORT.NAME:
        return p1.name.localeCompare(p2.name) * multiplier;

      case SORT.SEX:
        return p1.sex.localeCompare(p2.sex) * multiplier;

      case SORT.BORN:
        return (p1.born - p2.born) * multiplier;

      case SORT.DIED:
        return (p1.died - p2.died) * multiplier;

      default:
        return 0;
    }
  });
}

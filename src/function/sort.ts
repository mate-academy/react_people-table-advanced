import { Person } from "../types";
import { SORT } from "../types/sort";
import { SORT_DIRECTION } from "../types/sortDirection";

export function sort(people: Person[], sortField: SORT, sortDirection: SORT_DIRECTION): Person[] {
  if (sortDirection === SORT_DIRECTION.NONE) {
      return [...people];
  }

  const multiplier = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

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
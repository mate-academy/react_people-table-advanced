import { Person } from '../types';
import { SortBy, SortOrder } from '../types/Sort';

export function sortPeople(
  people: Person[],
  field: keyof Person,
  order: string,
): Person[] {
  const sorted = [...people];

  switch (order) {
    case SortOrder.asc:
      if (field === SortBy.name || field === SortBy.sex) {
        sorted.sort((a, b) => {
          return a[field].localeCompare(b[field]);
        });
      } else {
        sorted.sort((a, b) => {
          const n1 = a[field] ? +a[field] : 0;
          const n2 = b[field] ? +b[field] : 0;

          return n1 - n2;
        });
      }

      break;

    case SortOrder.decs:
      if (field === SortBy.name || field === SortBy.sex) {
        sorted.sort((a, b) => {
          return b[field].localeCompare(a[field]);
        });
      } else {
        sorted.sort((a, b) => {
          const n1 = a[field] ? +a[field] : 0;
          const n2 = b[field] ? +b[field] : 0;

          return n2 - n1;
        });
      }

      break;
  }

  return sorted;
}

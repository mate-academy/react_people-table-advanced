import { Person } from '../types';

export function sortPeople(
  filter: string | null,
  sortOrder: string | null,
  peopleToSort: Person[],
) {
  if (!filter) {
    return peopleToSort;
  }

  return peopleToSort.toSorted((p1, p2) => {
    switch (filter) {
      case 'name': {
        const v = p1.name.toLowerCase().localeCompare(p2.name.toLowerCase());

        return sortOrder ? v * -1 : v;
      }

      case 'sex': {
        const v = p1.sex.localeCompare(p2.sex);

        return sortOrder ? v * -1 : v;
      }

      case 'born': {
        const v = p1.born - p2.born;

        return sortOrder ? v * -1 : v;
      }

      case 'died': {
        const v = p1.died - p2.died;

        return sortOrder ? v * -1 : v;
      }

      default:
        return 0;
    }
  });
}

import { Person } from '../types';

export function getSortedPeople(
  people: Person[],
  sortField: string | null,
  order: string | null,
) {
  const sorted = [...people].sort((p1, p2) => {
    switch (sortField) {
      case 'name':
        return p1.name.localeCompare(p2.name);
      case 'sex':
        return p1.sex.localeCompare(p2.sex);
      case 'born':
        return p1.born - p2.born;
      case 'died':
        return p1.died - p2.died;
      default:
        return 0;
    }
  });

  if (order) {
    sorted.reverse();
  }

  return sorted;
}

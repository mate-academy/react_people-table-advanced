import { Person } from '../types/Person';

export function sortPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] {
  if (!sort) {
    return people;
  }

  const sorted = [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sex':
        return a.sex.localeCompare(b.sex);
      case 'born':
        return a.born - b.born;
      case 'died':
        return a.died - b.died;
      default:
        return 0;
    }
  });

  return order === 'desc' ? sorted.reverse() : sorted;
}

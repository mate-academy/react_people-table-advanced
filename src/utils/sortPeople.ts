import { Person } from '../types';

export function sortPeople(people: Person[], sortBy: string) {
  return [...people].sort((a, b) => {
    switch (sortBy) {
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
}

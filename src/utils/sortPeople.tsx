import { Person } from '../types';

enum SortBy {
  Died = 'died',
  Born = 'born',
  Sex = 'sex',
  Name = 'name',
}

interface Sort {
  sortBy: string | null,
  order: string | null,
}

export function sortPeople(people: Person[], sort: Sort) {
  const peopleCopy = [...people];

  const direction = sort.order ? -1 : 1;

  if (sort.sortBy) {
    switch (sort.sortBy) {
      case SortBy.Died:
        return peopleCopy.sort((person1, person2) => (
          (person1.died - person2.died) * direction
        ));
      case SortBy.Born:
        return peopleCopy.sort((person1, person2) => (
          (person1.born - person2.born) * direction
        ));
      case SortBy.Sex:
        return peopleCopy.sort((person1, person2) => (
          (person1.sex.localeCompare(person2.sex)) * direction
        ));
      case SortBy.Name:
        return peopleCopy.sort((person1, person2) => (
          (person1.name.localeCompare(person2.name)) * direction
        ));
      default:
        return peopleCopy;
    }
  }

  return peopleCopy;
}

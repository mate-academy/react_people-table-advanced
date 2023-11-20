import { Person } from '../types';
import { Sort } from '../types/Sort';

export function sortPeople(people: Person[], sort: Sort) {
  const peopleCopy = [...people];

  const direction = sort.order ? -1 : 1;

  if (sort.sortBy) {
    switch (sort.sortBy) {
      case 'died':
        return peopleCopy.sort((Person1, Person2) => (
          (Person1.died - Person2.died) * direction
        ));
      case 'born':
        return peopleCopy.sort((Person1, Person2) => (
          (Person1.born - Person2.born) * direction
        ));
      case 'sex':
        return peopleCopy.sort((Person1, Person2) => (
          (Person1.sex.localeCompare(Person2.sex)) * direction
        ));
      case 'name':
        return peopleCopy.sort((Person1, Person2) => (
          (Person1.name.localeCompare(Person2.name)) * direction
        ));
      default:
        return peopleCopy;
    }
  }

  return peopleCopy;
}

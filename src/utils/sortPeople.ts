import { Person } from '../types';
import { Sort } from '../types/Sort';

export const sortPeople = (sortParam: Sort, people: Person[]) => {
  const copy = [...people];

  switch (sortParam) {
    case Sort.Name:
      return copy.sort((personA, personB) => (
        personA.name.localeCompare(personB.name)
      ));

    case Sort.Sex:
      return copy.sort((personA, personB) => (
        personA.sex.localeCompare(personB.sex)
      ));

    case Sort.Born:
      return copy.sort((personA, personB) => (
        personA.born - personB.born
      ));

    case Sort.Died:
      return copy.sort((personA, personB) => (
        personA.died - personB.died
      ));

    default:
      return copy;
  }
};

import { Person } from '../types';
import { SortType } from '../types/SortType';

export const sortPeople = (sortParam: string, people: Person[]) => {
  switch (sortParam) {
    case SortType.name:
      return people.sort((personA, personB) => (
        personA.name.localeCompare(personB.name)
      ));

    case SortType.sex:
      return people.sort((personA, personB) => (
        personA.sex.localeCompare(personB.sex)
      ));

    case SortType.born:
      return people.sort((personA, personB) => (
        personA.born - personB.born
      ));

    case SortType.died:
      return people.sort((personA, personB) => (
        personA.died - personB.died
      ));

    default:
      return people;
  }
};

import { Person } from '../types';

export const sortPeople = (sortParam: string, people: Person[]) => {
  switch (sortParam) {
    case 'name':
      return people.sort((personA, personB) => (
        personA.name.localeCompare(personB.name)
      ));

    case 'sex':
      return people.sort((personA, personB) => (
        personA.sex.localeCompare(personB.sex)
      ));

    case 'born':
      return people.sort((personA, personB) => (
        personA.born - personB.born
      ));

    case 'died':
      return people.sort((personA, personB) => (
        personA.died - personB.died
      ));

    default:
      return people;
  }
};

import { Person } from '../types';

export const sortPeople = (sortParam: string, people: Person[]) => {
  const copy = [...people];

  switch (sortParam) {
    case 'name':
      return copy.sort((personA, personB) => (
        personA.name.localeCompare(personB.name)
      ));

    case 'sex':
      return copy.sort((personA, personB) => (
        personA.sex.localeCompare(personB.sex)
      ));

    case 'born':
      return copy.sort((personA, personB) => (
        personA.born - personB.born
      ));

    case 'died':
      return copy.sort((personA, personB) => (
        personA.died - personB.died
      ));

    default:
      return copy;
  }
};

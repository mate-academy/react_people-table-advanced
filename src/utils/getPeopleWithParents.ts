import { Person } from '../types';

export function getPeopleWithParents(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      father: people.find(pa => pa.name === person.fatherName),
      mother: people.find(ma => ma.name === person.motherName),
    };
  });
}

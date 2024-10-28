import { Person } from '../types';

function getCentury(year: number) {
  return Math.ceil(year / 100).toString();
}

export function getPeopleWithParents(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      father: people.find(pa => pa.name === person.fatherName),
      mother: people.find(ma => ma.name === person.motherName),
      century: getCentury(person.born),
    };
  });
}

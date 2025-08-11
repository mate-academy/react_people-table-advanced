import { Person } from '../types';

export function getPreparedPeople(people: Person[]) {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
    century: Math.ceil(person.born / 100),
  }));
}

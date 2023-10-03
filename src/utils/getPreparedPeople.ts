import { Person } from '../types';

export function getPreparedPeople(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(({ name }) => name === person.motherName),
      father: people.find(({ name }) => name === person.fatherName),
    };
  });
}

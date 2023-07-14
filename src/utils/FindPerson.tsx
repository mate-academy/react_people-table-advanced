import { Person } from '../types';

export const findParrentsForEachPerson = (persons: Person[]) => {
  return persons.map(person => ({
    ...person,
    mother: persons.find(mom => mom.name === person.motherName),
    father: persons.find(dad => dad.name === person.fatherName),
  }));
};

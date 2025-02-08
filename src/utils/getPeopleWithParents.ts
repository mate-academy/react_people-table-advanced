import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
};

import { Person } from '../types';

export const setParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(parent => parent.name === person.motherName),
    father: people.find(parent => parent.name === person.fatherName),
  }));
};

import { Person } from '../types';

export const updatePeopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    mother: people.find(pers => pers.name === person.motherName),
    father: people.find(pers => pers.name === person.fatherName),
  }));
};

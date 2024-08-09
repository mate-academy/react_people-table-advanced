import { Person } from '../types';

export const updatePeopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    mother: people.find(({ name }) => name === person.motherName),
    father: people.find(({ name }) => name === person.fatherName),
  }));
};

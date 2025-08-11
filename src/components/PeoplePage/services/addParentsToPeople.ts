import { Person } from '../../../types';

export const addParentsToPeople = (people: Person[]): Person[] =>
  people.map(person => ({
    ...person,
    mother: people.find(({ name }) => name === person.motherName),
    father: people.find(({ name }) => name === person.fatherName),
  }));

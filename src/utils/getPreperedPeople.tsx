import { Person } from '../types';

export const getPreparedPeople = (people: Person[]): Person[] => (
  people.map(person => ({
    ...person,
    mother: people.find(potentialMother => (
      potentialMother.name === person.motherName
    )),
    father: people.find(potentialFather => (
      potentialFather.name === person.fatherName
    )),
  }))
);

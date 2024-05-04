import { Person } from '../types/Person';

export const preparePeopleWithLinks = (peopleList: Person[]): Person[] =>
  peopleList.map(person => ({
    ...person,
    father:
      peopleList.find(candidate => candidate.name === person.fatherName) ||
      null,
    mother:
      peopleList.find(candidate => candidate.name === person.motherName) ||
      null,
  }));

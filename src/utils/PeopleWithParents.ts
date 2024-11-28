import { Person } from '../types';

export const peopleWithPerents = (peopleFromServer: Person[]) => {
  return peopleFromServer.map(person => ({
    ...person,
    mother:
      peopleFromServer.find(({ name }) => name === person.motherName) || null,
    father:
      peopleFromServer.find(({ name }) => name === person.fatherName) || null,
  }));
};

export const addParentsToPeople = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    motherName: person.motherName || 'Unknown',
    fatherName: person.fatherName || 'Unknown',
  }));
};

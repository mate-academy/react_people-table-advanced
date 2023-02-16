import { Person } from '../types';

export const getMother = (people: Person[], person: Person) => (
  people.find(per => per.name === person.motherName)
);

export const getFather = (people: Person[], person: Person) => (
  people.find(per => per.name === person.fatherName)
);

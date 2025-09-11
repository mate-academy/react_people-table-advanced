import { Person } from '../types';

export const preparePeopleData = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
};

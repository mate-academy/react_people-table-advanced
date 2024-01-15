import { Person } from '../types';

export const getPeopleWithParrents = (people: Person[]) => {
  return people.map(person => ({
    mother: people.find(item => item.name === person.motherName) || null,
    father: people.find(item => item.name === person.fatherName) || null,
    ...person,
  }));
};

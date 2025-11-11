import { Person } from '../types';

export const groupPeopleParents = (people: Person[]) => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(ps => ps.name === person.motherName) || null,
      father: people.find(ps => ps.name === person.fatherName) || null,
    };
  });
};

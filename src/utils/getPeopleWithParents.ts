import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const motherObj = people.find(p => p.name === person.motherName) || null;
    const fatherObj = people.find(p => p.name === person.fatherName) || null;

    return {
      ...person,
      mother: motherObj,
      father: fatherObj,
    };
  });
};

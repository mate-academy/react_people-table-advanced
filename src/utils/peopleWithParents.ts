import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(per => per.name === person.motherName) || null;
    const father = people.find(per => per.name === person.fatherName) || null;

    return {
      ...person,
      mother,
      father,
    };
  });
};

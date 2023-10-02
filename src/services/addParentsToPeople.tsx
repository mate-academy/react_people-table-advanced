import { Person } from '../types';

export const addParentsToPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const father = people.find(({ name }) => person.fatherName === name);
    const mother = people.find(({ name }) => person.motherName === name);

    return ({
      ...person,
      father,
      mother,
    });
  });
};

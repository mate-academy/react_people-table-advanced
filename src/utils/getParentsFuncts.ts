import { Person } from '../types';

export const getParents = (people: Person[]) => {
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

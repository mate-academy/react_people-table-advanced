import { Person } from '../types';

export const peopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

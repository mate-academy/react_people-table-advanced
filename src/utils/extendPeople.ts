import { Person } from '../types';

const findPerson = (people: Person[], name?: string) => {
  return people.find(person => person.name === name);
};

export const extendPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = findPerson(people, person.motherName);
    const father = findPerson(people, person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

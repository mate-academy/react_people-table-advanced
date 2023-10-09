import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
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

import { Person } from '../types';

export const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(({ name }) => name === person.motherName),
      father: people.find(({ name }) => name === person.fatherName),
    };
  });
};

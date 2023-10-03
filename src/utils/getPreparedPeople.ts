import { Person } from '../types';

export const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
};

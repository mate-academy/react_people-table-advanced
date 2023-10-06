import { Person } from '../types';
import { findPersonByName } from './findPersonByName';

export const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: findPersonByName(people, person.motherName),
      father: findPersonByName(people, person.fatherName),
    };
  });
};

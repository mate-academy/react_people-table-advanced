import { Person } from '../types';
import { getPersonByName } from './getPersonByName';

export const getPreparedPeople = (people: Person[]): Person[] => (
  people.map(person => ({
    ...person,
    mother: getPersonByName(people, person.motherName),
    father: getPersonByName(people, person.fatherName),
  }))
);

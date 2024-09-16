import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) =>
  people.map(person => ({
    ...person,
    mother: people.find(
      currentPerson => currentPerson.name === person.motherName,
    ),
    father: people.find(
      currentPerson => currentPerson.name === person.fatherName,
    ),
  }));

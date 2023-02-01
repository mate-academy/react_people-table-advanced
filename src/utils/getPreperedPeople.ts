import { Person } from '../types';

const getPersonByName = (
  people: Person[],
  searchingPersonName: string,
) => people.find(person => person.name === searchingPersonName);

export const getPreperedPeople
  = (people: Person[]): Person[] => people.map(person => {
    return {
      ...person,
      mother: person.motherName
        ? getPersonByName(people, person.motherName)
        : undefined,
      father: person.fatherName
        ? getPersonByName(people, person.fatherName)
        : undefined,
    };
  });

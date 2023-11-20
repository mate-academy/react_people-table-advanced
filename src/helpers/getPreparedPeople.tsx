import { Person } from '../types';

export function getPreparedPeople(persons: Person[]) {
  return persons.map(person => {
    const mother = persons.find(({ name }) => person.motherName === name);
    const father = persons.find(({ name }) => person.fatherName === name);

    return {
      ...person,
      mother,
      father,
    };
  });
}

import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people
      .find(personMother => person.motherName === personMother.name);

    const father = people
      .find(personFather => person.fatherName === personFather.name);

    return {
      ...person,
      mother,
      father,
    };
  });
};

import { Person } from './types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map((person: Person) => {
    const personWithParents = person;

    personWithParents.mother = people.find(
      (foundPerson: Person) => foundPerson.name === person.motherName,
    );

    personWithParents.father = people.find(
      (foundPerson: Person) => foundPerson.name === person.fatherName,
    );

    return personWithParents;
  });
};

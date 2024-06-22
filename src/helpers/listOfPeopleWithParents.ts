import { Person } from '../types';

export const listOfPeopleWithParents = (people: Person[]): Person[] => {
  return people.map((person: Person) => {
    const copyPerson = { ...person };
    const father =
      people.find(personFather => personFather.name === person.fatherName) ||
      null;
    const mother =
      people.find(personMother => personMother.name === person.motherName) ||
      null;

    if (father) {
      copyPerson.father = father;
    }

    if (mother) {
      copyPerson.mother = mother;
    }

    return copyPerson;
  });
};

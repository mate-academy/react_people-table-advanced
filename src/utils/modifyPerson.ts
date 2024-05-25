import { Person } from '../../../react_people-table-basics/src/types';

export function modifyPerson(people: Person[], person: Person) {
  const mother = people.find(
    possibleMother => possibleMother.name === person.motherName,
  );
  const father = people.find(
    possibleFather => possibleFather.name === person.fatherName,
  );
  const modifiedPerson = { ...person, mother, father };

  return modifiedPerson;
}

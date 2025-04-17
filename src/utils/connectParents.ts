import { Person } from '../types';

export const connectParents = (
  person: Person,
  _: number,
  people: Person[],
): Person => {
  const newPerson = { ...person };

  if (!newPerson.motherName) {
    newPerson.motherName = '-';
  } else {
    newPerson.mother = people.find(
      mother => mother.name === newPerson.motherName,
    );
  }

  if (!newPerson.fatherName) {
    newPerson.fatherName = '-';
  } else {
    newPerson.father = people.find(
      father => father.name === newPerson.fatherName,
    );
  }

  return newPerson;
};

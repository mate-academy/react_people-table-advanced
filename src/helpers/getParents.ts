import { Person } from '../types';

export function getParents(people: Person[]) {
  const peopleWithParents = people.map((person) => {
    const newPerson = { ...person };

    newPerson.father = people
      .find(father => father.name === newPerson.fatherName);

    newPerson.mother = people
      .find(mother => mother.name === newPerson.motherName);

    return newPerson;
  });

  return peopleWithParents;
}

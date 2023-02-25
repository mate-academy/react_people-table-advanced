import { Person } from '../types/Person';

export function getPeopleWithParents(people: Person[]): Person[] {
  return people.map((person) => {
    if (!person.motherName && !person.fatherName) {
      return person;
    }

    const personWithParents: Person = { ...person };

    people.forEach((parent) => {
      if (parent.name === person.motherName) {
        personWithParents.mother = parent;

        return;
      }

      if (parent.name === person.fatherName) {
        personWithParents.father = parent;
      }
    });

    return personWithParents;
  });
}

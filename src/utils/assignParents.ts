import { Person } from '../types/Person';

export const assignParents = (people: Person[]) => {
  people.forEach(person => {
    const mother = people.find(parent => parent.name === person.motherName);
    const personWithParents = person;

    if (mother) {
      personWithParents.mother = mother;
    }

    const father = people.find(parent => parent.name === person.fatherName);

    if (father) {
      personWithParents.father = father;
    }

    return personWithParents;
  });
};

import { Person } from '../types/Person';

export const assignParents = (people: Person[]) => {
  const peopleWithParents: Person[] = people.map(person => {
    const personWithParents = { ...person };
    const mother = people.find(parent => parent.name === person.motherName);

    if (mother) {
      personWithParents.mother = mother;
    }

    const father = people.find(parent => parent.name === person.fatherName);

    if (father) {
      personWithParents.father = father;
    }

    return personWithParents;
  });

  return peopleWithParents;
};

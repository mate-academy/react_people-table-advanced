import { Person } from '../types';

export const getParents = (people: Person[]) => {
  const withParents = people.map(person => {
    const copy = { ...person };
    let mother;
    let father;

    if (person.motherName) {
      mother = people.find(el => el.name === person.motherName);
    }

    if (person.fatherName) {
      father = people.find(el => el.name === person.fatherName);
    }

    copy.mother = mother;
    copy.father = father;

    return copy;
  });

  return withParents;
};

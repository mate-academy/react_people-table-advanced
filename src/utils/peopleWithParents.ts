import { Person } from '../types';
import { findParents } from './findParents';

export const peopleWithParents = (people: Person[]) => {
  const newPeople = people.map(person => {
    let mother = undefined;
    let father = undefined;

    if (person.fatherName) {
      father = findParents(people, person.fatherName);
    }

    if (person.motherName) {
      mother = findParents(people, person.motherName);
    }

    return { ...person, mother, father };
  });

  return newPeople;
};

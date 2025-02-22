import { Person } from '../types';

export const matchParents = (people: Person[]) => {
  return people.map(child => {
    const mother = child.motherName
      ? people.find(m => m.name === child.motherName) || null
      : null;
    const father = child.fatherName
      ? people.find(f => f.name === child.fatherName) || null
      : null;

    return { ...child, mother, father };
  });
};

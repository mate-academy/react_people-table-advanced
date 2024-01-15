import { Person } from '../types';

export const matchParents = (people: Person[]) => {
  const peopleWithParents = people.map(child => {
    const motherItem = child.motherName
      ? people.find(mother => mother.name === child.motherName) || null
      : null;

    const fatherItem = child.fatherName
      ? people.find(father => father.name === child.fatherName) || null
      : null;

    return { ...child, mother: motherItem, father: fatherItem };
  });

  return peopleWithParents;
};

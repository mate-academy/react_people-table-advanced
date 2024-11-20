import { Person } from '../types';

export const findParents = (people: Person[]) => {
  const peopleWithParents = people.map(person => {
    const personWithParents = { ...person };

    personWithParents.mother = people.find(
      personItem => personItem.name === person.motherName,
    );

    personWithParents.father = people.find(
      personItem => personItem.name === person.fatherName,
    );

    return personWithParents;
  });

  return peopleWithParents;
};

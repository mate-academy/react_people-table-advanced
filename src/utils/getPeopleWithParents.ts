import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]): Person[] => {
  const peopleByName = Object.fromEntries(
    people.map(person => [person.name, person]),
  );

  return people.map(person => {
    const father = person.fatherName && peopleByName[person.fatherName];
    const mother = person.motherName && peopleByName[person.motherName];

    return {
      ...person,
      ...(father && { father }),
      ...(mother && { mother }),
    };
  });
};

import { Person } from '../types';

export const getPeopleWithParents = (peopleFromServer: Person[]) => {
  const peopleMap = new Map<string, Person>();

  peopleFromServer.forEach(person => {
    peopleMap.set(person.name, person);
  });

  const peopleWithParents = peopleFromServer.map(person => ({
    ...person,
    father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
    mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
  }));

  return peopleWithParents;
};

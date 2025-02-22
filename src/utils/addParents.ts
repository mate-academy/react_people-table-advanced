import { Person } from '../types';

export function addParents(person: Person, peopleFromServer: Person[]) {
  const mother = peopleFromServer.find(pers => pers.name === person.motherName);
  const father = peopleFromServer.find(pers => pers.name === person.fatherName);

  return { ...person, father, mother };
}

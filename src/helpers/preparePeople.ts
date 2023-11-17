import { Person } from '../types';

export const preparePeople = (peopleFromServer: Person[]): Person[] => {
  return peopleFromServer.map((person) => ({
    ...person,
    mother: peopleFromServer.find(mother => mother.name === person.motherName),
    father: peopleFromServer.find(father => father.name === person.fatherName),
  }));
};

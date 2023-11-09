import { Person } from '../types';

export const preparePeopleData = (peopleFromServer : Person[]) => {
  const findMother = (person: Person) => {
    return peopleFromServer.find(m => m.name === person.motherName) || null;
  };

  const findFather = (person: Person) => {
    return peopleFromServer.find(f => f.name === person.fatherName) || null;
  };

  const result = peopleFromServer.map(person => ({
    ...person,
    mother: findMother(person),
    father: findFather(person),
  }));

  return result;
};

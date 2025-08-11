import { Person } from '../types';

export const findPerents = (peopleFromServer: Person[]) => {
  return peopleFromServer.map(person => ({
    ...person,
    mother:
      peopleFromServer.find(({ name }) => name === person.motherName) || null,
    father:
      peopleFromServer.find(({ name }) => name === person.fatherName) || null,
  }));
};

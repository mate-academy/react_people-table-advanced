import { Person } from '../types';

export const getPersonWithParents = (peopleFromServer: Person[]) => {
  return peopleFromServer.map(person => {
    const mother = peopleFromServer.find(
      ({ name }) => name === person.motherName,
    );

    const father = peopleFromServer.find(
      ({ name }) => name === person.fatherName,
    );

    return {
      ...person,
      mother,
      father,
    };
  });
};

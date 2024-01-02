import { Person } from '../types/Person';

export const getFoolPeoplesInfo = (peopleFromServer: Person[]) => {
  return peopleFromServer.map((person) => {
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

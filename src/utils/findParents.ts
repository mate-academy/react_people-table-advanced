import { Person } from '../types';

export const findParents = (peoplesFromServer: Person[]) => {
  return peoplesFromServer.map(person => {
    const mother = peoplesFromServer.find(p => p.name === person.motherName);
    const father = peoplesFromServer.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

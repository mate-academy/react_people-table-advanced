import { Person } from '../types';

export const filteredDataFromServer = (dataFromServer: Person[]) => {
  return dataFromServer
    .map(person => ({
      ...person,
      mother: dataFromServer.find(mom => mom.name === person.motherName),
      father: dataFromServer.find(dad => dad.name === person.fatherName),
    }));
};

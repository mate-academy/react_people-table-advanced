import { Person } from '../types';

export const prepareDataFromServer = (dataFromServer: Person[]) => {
  return dataFromServer
    .map(person => ({
      ...person,
      mother: dataFromServer.find(p => {
        if (person.motherName?.localeCompare(p.name) === 0) {
          return p;
        }

        return 0;
      }),
      father: dataFromServer.find(p => {
        if (person.fatherName?.localeCompare(p.name) === 0) {
          return p;
        }

        return 0;
      }),
    }));
};

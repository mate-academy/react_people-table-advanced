import { Person } from '../types';

export const setPeopleWithParents = (peopleFromServer: Person[]) => {
  const peopleWithParents = peopleFromServer.map(person => {
    const mother = peopleFromServer.find(mum => mum.name === person.motherName);
    const father = peopleFromServer.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return peopleWithParents;
};

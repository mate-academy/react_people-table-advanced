import { Person } from '../types';
import { NOT_SET_VALUE } from './variables';

export const getPreparedPeople = (peopleFromServer: Person[]) => {
  return peopleFromServer
    .map(person => {
      const tempPerson = person;

      tempPerson.motherName = person.motherName || NOT_SET_VALUE;
      tempPerson.fatherName = person.fatherName || NOT_SET_VALUE;
      tempPerson.mother = peopleFromServer
        .find(mother => mother.name === person.motherName);
      tempPerson.father = peopleFromServer
        .find(father => father.name === person.fatherName);

      return tempPerson;
    });
};

import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(motherToFind => {
      return motherToFind.name === person.motherName;
    });

    const father = people.find(fatherToFind => {
      return fatherToFind.name === person.fatherName;
    });

    return {
      ...person,
      mother,
      father,
    };
  });
};

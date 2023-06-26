import { Person } from '../types';

export const getFullDetailsOfPerson = (peoples: Person[]): Person[] => {
  return peoples.map(person => {
    const mother = peoples.find(p => p.name === person.motherName);
    const father = peoples.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

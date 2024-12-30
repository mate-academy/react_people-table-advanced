import { Person } from '../types';

export const getFamily = (people: Person[]) => {
  return people.map(person => {
    const father = people.find(p => p.name === person.fatherName);
    const mother = people.find(p => p.name === person.motherName);

    return {
      ...person,
      father,
      mother,
    };
  });
};

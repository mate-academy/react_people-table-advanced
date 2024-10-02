import { Person } from '../types';

export const handleInformation = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(({ name }) => {
      return name === person.motherName;
    });
    const father = people.find(({ name }) => {
      return name === person.fatherName;
    });

    return {
      ...person,
      mother,
      father,
    };
  });
};

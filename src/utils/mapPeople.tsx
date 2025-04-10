import { Person } from '../types';

export const mapPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName) || undefined;
    const father = people.find(p => p.name === person.fatherName) || undefined;

    return {
      ...person,
      mother,
      father,
    };
  });
};

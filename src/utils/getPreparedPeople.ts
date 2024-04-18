import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const father = people.find(parent => parent.name === person.fatherName);
    const mother = people.find(parent => parent.name === person.motherName);

    return { ...person, father, mother };
  });
};

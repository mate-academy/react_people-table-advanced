import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return { ...person, mother, father };
  });
};

import { Person } from '../types/Person';

export const extendPeople = (people: Person[]) => {
  return people.map((person) => ({
    ...person,
    mother: people.find(({ name }) => name === person.motherName),
    father: people.find(({ name }) => name === person.fatherName),
  }));
};

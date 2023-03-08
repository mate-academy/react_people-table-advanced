import { Person } from '../types';

export const preparePeople = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(human => human.name === person.motherName),
    father: people.find(human => human.name === person.fatherName),
  }));
};

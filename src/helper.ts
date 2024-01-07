import { Data } from './types/types';
import { Person } from './types/Person';

export const preparePeople = <T extends Data>(people: T[]): T[] => {
  return people.map(person => {
    const mother = people.find(({ name }) => (
      name === person.motherName
    )) || null;
    const father = people.find(({ name }) => (
      name === person.fatherName
    )) || null;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const getCentury = (person: Person) => Math.ceil(person.born / 100);

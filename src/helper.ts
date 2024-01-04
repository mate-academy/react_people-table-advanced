import { Data } from './types/types';
import { Person } from './types/Person';

export const preparePeople = <T extends Data>(people: T[]): T[] => {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });
};

export const getCentury = (person: Person) => Math.ceil(person.born / 100);

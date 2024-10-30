import { Person } from '../types/Person';

export const personsWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother: mother ? mother : undefined,
      father: father ? father : undefined,
    };
  });
};

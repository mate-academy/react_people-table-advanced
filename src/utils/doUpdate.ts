import { Person } from '../types';

export const doUpdate = (array: Person[]) => {
  return array.map(person => {
    const father = array.find(human => human.name === person.fatherName);
    const mother = array.find(human => human.name === person.motherName);

    return { ...person, father, mother };
  });
};

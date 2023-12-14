import { Person } from '../types';

export const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(human => human.name === person.motherName);
    const father = people.find(human => human.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

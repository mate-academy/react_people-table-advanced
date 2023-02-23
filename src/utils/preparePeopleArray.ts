import { Person } from '../types';

export const preparePeopleArray = (peopleArray: Person[]) => {
  return peopleArray.map(person => {
    const mother = peopleArray.find(mom => mom.name === person.motherName);
    const father = peopleArray.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

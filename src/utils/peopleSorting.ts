import { Person } from '../types';

export const transformPeople = (people: Person[]): Person[] => {
  return people.map(currentPerson => {
    const mother =
      currentPerson.motherName &&
      people.find(
        person =>
          person.name === currentPerson.motherName &&
          person.born < currentPerson.born,
      );

    const father =
      currentPerson.fatherName &&
      people.find(
        person =>
          person.name === currentPerson.fatherName &&
          person.born < currentPerson.born,
      );

    return {
      ...currentPerson,
      ...(mother ? { mother } : {}),
      ...(father ? { father } : {}),
    };
  });
};

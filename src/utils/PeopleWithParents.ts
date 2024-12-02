import { Person } from '../types';

export const peopleWithPerents = (peopleFromServer: Person[]): Person[] => {
  const parentsMap: {
    mothers: { [key: string]: Person };
    fathers: { [key: string]: Person };
  } = {
    mothers: {},
    fathers: {},
  };

  peopleFromServer.forEach(person => {
    if (person.motherName) {
      parentsMap.mothers[person.motherName] = person;
    }

    if (person.fatherName) {
      parentsMap.fathers[person.fatherName] = person;
    }
  });

  return peopleFromServer.map(person => ({
    ...person,
    mother: parentsMap.mothers[person.motherName || ''] || null,
    father: parentsMap.fathers[person.fatherName || ''] || null,
  }));
};

import { Person } from '../types';
import { EMPTY_VALUE } from '../variables/constants';

export const getNormalizedPeopleList = (people: Person[]) => {
  const parentsList = people.reduce((acc, person) => {
    const key = person.name;
    /* eslint no-param-reassign: "error" */

    acc[key] = person;

    return acc;
  }, {} as {
    [key: string]: Person;
  });

  const list = people.map(person => {
    const personCopy = { ...person };
    const normalizedMotherName = person.motherName || EMPTY_VALUE;
    const normalizedFatherName = person.fatherName || EMPTY_VALUE;

    personCopy.motherName = normalizedMotherName;
    personCopy.fatherName = normalizedFatherName;

    personCopy.mother = parentsList[normalizedMotherName];
    personCopy.father = parentsList[normalizedFatherName];

    return personCopy;
  });

  return list;
};

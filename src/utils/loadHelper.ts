/* eslint-disable no-restricted-syntax */
import { Person } from '../types';

export const linkPeople = (peopleList: Person[]): Person[] => {
  const peopleListClone = [...peopleList];

  for (const person of peopleListClone) {
    person.mother = peopleList
      .find(element => element.name === person.motherName);
    person.father = peopleList
      .find(element => element.name === person.fatherName);
  }

  return peopleListClone;
};

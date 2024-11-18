import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  const newPeople = <Person[]>JSON.parse(JSON.stringify(people));

  newPeople.forEach((person, i) => {
    const mother = newPeople.find(el => el.name === person.motherName);
    const father = newPeople.find(el => el.name === person.fatherName);

    if (mother) {
      newPeople[i].mother = mother;
    }

    if (father) {
      newPeople[i].father = father;
    }
  });

  return newPeople;
};

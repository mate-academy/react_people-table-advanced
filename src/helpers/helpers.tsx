import { Person } from '../types';

export const getVisiblePeople = (people: Person[]) => {
  const peopleMap = new Map();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  const visiblePeople = people.map(person => {
    const mother = peopleMap.get(person.motherName);
    const father = peopleMap.get(person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return visiblePeople;
};

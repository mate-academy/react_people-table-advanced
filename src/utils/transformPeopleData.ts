import { Person } from '../types';

export const transformPeopleData = (people: Person[]): Person[] => {
  const peopleMap = new Map<string, Person>();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  return people.map(person => {
    const mother = person.motherName ? peopleMap.get(person.motherName) : null;
    const father = person.fatherName ? peopleMap.get(person.fatherName) : null;

    return {
      ...person,
      mother: mother || undefined,
      father: father || undefined,
    };
  });
};

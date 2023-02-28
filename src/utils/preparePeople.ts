import { Person } from '../types';

const findPeopleByName = (people: Person[], name: string | null) => {
  return people.find(p => p.name === name);
};

export const preparePeople = (people: Person[]) => {
  return people.map(person => (
    {
      ...person,
      mother: findPeopleByName(people, person.motherName),
      father: findPeopleByName(people, person.fatherName),
    }
  ));
};

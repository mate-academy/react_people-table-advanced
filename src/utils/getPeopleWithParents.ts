import { Person } from '../types';

export function getPeopleWithParents(people: Person[]) {
  return people.map(person => ({
    ...person,
    father:
      people.find(father => person.fatherName === father.name) || person.father,
    mother:
      people.find(mother => person.motherName === mother.name) || person.mother,
  }));
}

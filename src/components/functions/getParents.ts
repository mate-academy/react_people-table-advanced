import { Person } from '../../types';

export function findFather(child: Person, people: Person[]) {
  return people.find(person => person.name === child.fatherName);
}

export function findMother(child: Person, people: Person[]) {
  return people.find(person => person.name === child.motherName);
}

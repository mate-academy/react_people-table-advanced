import { Person } from '../types';

export function FindPersonByName(people: Person[], name: string) {
  return people.find(person => person.name === name);
}

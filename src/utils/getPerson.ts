import { Person } from '../types';

export function getPerson(people: Person[], name: string | null) {
  if (!name) {
    return null;
  }

  return people.find(person => person.name === name) || null;
}

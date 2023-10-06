import { Person } from '../types';

export function getParent(people: Person[], parentName: string) {
  return people.find(({ name }) => name === parentName);
}

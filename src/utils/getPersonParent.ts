import { Person } from '../types';

export const getPersonParent = (people: Person[], parentName:string | null) => (
  people.find(person => person.name === parentName));

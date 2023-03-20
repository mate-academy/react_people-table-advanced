import { Person } from '../types';

export const findParent = (people : Person[], name: string | null) => (
  people.find(person => person.name === name)
);

import { Person } from '../types/Person';

export const getPersonSlug = (person: Person): string => {
  return `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
};

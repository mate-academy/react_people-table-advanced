import { Person } from '../types/Person';

export function getSlug(person: Person): string {
  return `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`;
}

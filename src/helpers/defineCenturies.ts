import { Person } from '../types';

export const defineCentury = (people: Person[]): number[] => {
  const centuries = new Set<number>();

  people.forEach(person => centuries.add(Math.ceil(person.born / 100)));

  return Array.from(centuries).sort((a, b) => a - b);
};

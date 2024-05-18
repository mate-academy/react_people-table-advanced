import { Person } from '../types';

export const getSortCentury = (sorted: Person[], century: string[]) => {
  const min = Math.min(...century.map(Number)) * 100 - 100;
  const max = Math.max(...century.map(Number)) * 100;

  return sorted.filter(pers => pers.born >= min && pers.born <= max);
};

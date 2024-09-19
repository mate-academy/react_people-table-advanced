import { Person } from '../types';
import { century } from './calculateCentury';

export const listOfCenturies = (people: Person[]) => {
  const list: number[] = [];

  people.forEach(({ born }) => {
    const centuryBorn = century(born);

    if (!list.includes(centuryBorn)) {
      list.push(centuryBorn);
    }
  });

  return list.sort((a, b) => a - b);
};

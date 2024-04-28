import { Person } from '../types';

export const getExistingCenturies = (people: Person[]) => {
  const centuries: number[] = people
    .map(({ born }) => Math.ceil(born / 100))
    .reduce((acc: number[], century: number) => {
      if (!acc.includes(century)) {
        acc.push(century);
      }

      return acc;
    }, []);

  return centuries.sort((a, b) => a - b);
};
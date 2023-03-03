import { Person } from '../types/Person';

export const filterPeopleByCenturies = (
  currentPeople: Person[],
  param: string[],
) => (
  currentPeople.filter(person => (
    param.includes(Math.floor(person.born / 100 + 1).toString())
  ))
);

import { Person } from '../../types';

export function filterPeopleBySex(
  people: Person[],
  targetSex: string,
): Person[] {
  return people.filter(
    person => person.sex.toLowerCase() === targetSex.toLowerCase(),
  );
}

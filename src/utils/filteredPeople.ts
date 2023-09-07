import { Person } from '../types';
import { getCentury } from './convertCentury';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: number[],
): Person[] => {
  const filter1 = people
    .filter(person => person.name.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase())
      || person.motherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
      || person.fatherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
    .filter(person => person.sex.includes(sex));

  if (centuries.length) {
    return centuries.flatMap(century => filter1
      .filter(person => getCentury(person.born) === century));
  }

  return filter1;
};

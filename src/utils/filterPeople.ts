import { Person } from '../types';

export const filterPeople = (
  people: Person[], query: string, sex: string, centuries: string[],
) => {
  const peopleIncludesQuery = people
    .filter(person => person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query));

  const peopleSatisfyingSex = peopleIncludesQuery
    .filter(person => person.sex.includes(sex));

  const peopleSatisfyingCentury = peopleSatisfyingSex
    .filter(person => centuries
      .includes((Math.floor(person.born / 100) + 1).toString()));

  return centuries.length
    ? peopleSatisfyingCentury
    : peopleSatisfyingSex;
};

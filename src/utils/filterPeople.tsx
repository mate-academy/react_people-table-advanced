import { Person } from '../types';

export const filterPeople = (
  people: Person[], query: string, sex: string, centuries: string[],
) => {
  const peopleIncludesQuery = people
    .filter(({
      name, motherName, fatherName,
    }) => name.toLowerCase().includes(query)
    || motherName?.toLowerCase().includes(query)
      || fatherName?.toLowerCase().includes(query));

  const peopleFilteredBySex = peopleIncludesQuery
    .filter(({ sex: PersonSex }) => PersonSex.includes(sex));

  const peopleFilteredByCentury = peopleFilteredBySex
    .filter(({ born }) => centuries
      .includes((Math.floor(born / 100) + 1).toString()));

  return centuries.length
    ? peopleFilteredByCentury
    : peopleFilteredBySex;
};

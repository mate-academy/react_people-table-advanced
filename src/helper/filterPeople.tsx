import { Person } from '../types';

export function filterPeople(
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => person.name.toLowerCase()
      .includes(query.toLowerCase())
      || person.motherName?.toLowerCase()
        .includes(query.toLowerCase())
      || person.fatherName?.toLowerCase()
        .includes(query.toLowerCase()));
  }

  return filteredPeople;
}

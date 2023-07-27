import { Person } from '../types/Person';

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[] | string,
) => {
  let filteredPeople = [...people];

  if (centuries.length) {
    filteredPeople = filteredPeople.filter((person: Person) => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (sex) {
    filteredPeople = filteredPeople
      .filter((person: Person) => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter((person: Person) => person.name
      .toLowerCase().trim().includes(query.toLowerCase().trim())
      || person.fatherName?.toLowerCase().trim()
        .includes(query.toLowerCase().trim())
      || person.motherName?.toLowerCase().trim()
        .includes(query.toLowerCase().trim()));
  }

  return filteredPeople;
};

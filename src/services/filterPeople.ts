import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => centuries
      .includes(Math.ceil(person.born / 100).toString()));
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople
    = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query);
      })
    || filteredPeople.filter(person => {
      return person.motherName?.toLowerCase().includes(normalizedQuery);
    })
    || filteredPeople.filter(person => {
      return person.fatherName?.toLowerCase().includes(normalizedQuery);
    });
  }

  return filteredPeople;
};

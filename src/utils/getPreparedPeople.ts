import { Person } from '../types';
import { CENTURY_VALUE } from './constants';

const searchingByName = (person: string | null, query: string) => (
  person?.toLowerCase().includes(query)
);

function filterByName(person: Person, query: string) {
  const normalizedQuery = query.toLowerCase();

  return searchingByName(person.name, normalizedQuery)
    || searchingByName(person.fatherName, normalizedQuery)
    || searchingByName(person.motherName, normalizedQuery);
}

function calculationCentry(year: number) {
  return Math.ceil(year / CENTURY_VALUE);
}

export function getFilteredPeople(
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) {
  let filteredPeople = people;

  if (query) {
    filteredPeople = filteredPeople
      .filter(person => filterByName(person, query));
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sex;
    });
  }

  if (centuries.length) {
    const preparedCentries = centuries.map(Number);

    filteredPeople = filteredPeople
      .filter(({ born }) => preparedCentries.includes(calculationCentry(born)));
  }

  return filteredPeople;
}

import { Person } from '../types';

function filterByName(person: Person, query: string) {
  const normalizedQuery = query.toLowerCase();

  return person.name.toLowerCase().includes(normalizedQuery)
    || person.fatherName?.toLowerCase().includes(normalizedQuery)
    || person.motherName?.toLowerCase().includes(normalizedQuery);
}

function calculationCentry(year: number) {
  return Math.ceil(year / 100);
}

export function getPreparedPeople(
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

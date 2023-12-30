import { Person } from '../types';

export function getPersonByName(name: string, people: Person[]) {
  return people.find(person => person.name === name);
}

function getCentury(year: number): string {
  return Math.ceil(year / 100).toString();
}

interface Filters {
  centuries: string[],
  query: string,
  sex: string,
}

export function getFilteredPeople(people: Person[], filters: Filters) {
  const { centuries, query, sex } = filters;
  let filteredPeople = [...people];

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      person => filters.centuries.includes(getCentury(person.born)),
    );
  }

  if (filters.query.trim()) {
    filteredPeople = filteredPeople.filter(person => {
      const preparedQuery = query.toLowerCase().trim();
      const preparedName = person.name.toLowerCase();
      const preparedMotherName = person.motherName?.toLowerCase();
      const preparedFatherName = person.fatherName?.toLowerCase();

      return preparedName.includes(preparedQuery)
        || preparedMotherName?.includes(preparedQuery)
        || preparedFatherName?.includes(preparedQuery);
    });
  }

  if (filters.sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
}

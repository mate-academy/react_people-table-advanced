import { Person } from '../types';

export function getPersonByName(name: string, people: Person[]) {
  return people.find(person => person.name === name);
}

function getCentury(year: number): string {
  return Math.ceil(year / 100).toString();
}

interface Filters {
  centuries: string[];
  query: string;
  sex: string;
}

interface SortParams {
  sortField: keyof Person;
  order: string;
}

export function getPreparedPeople(
  people: Person[],
  params: Filters & SortParams,
): Person[] {
  let preparedPeople = [...people];

  const {
    centuries,
    query,
    sex,
    sortField,
    order,
  } = params;

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(
      person => centuries.includes(getCentury(person.born)),
    );
  }

  if (query.trim()) {
    preparedPeople = preparedPeople.filter(person => {
      const preparedQuery = query.toLowerCase().trim();
      const preparedName = person.name.toLowerCase();
      const preparedMotherName = person.motherName?.toLowerCase();
      const preparedFatherName = person.fatherName?.toLowerCase();

      return preparedName.includes(preparedQuery)
        || preparedMotherName?.includes(preparedQuery)
        || preparedFatherName?.includes(preparedQuery);
    });
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (sortField) {
    preparedPeople.sort((person1, person2) => {
      const a = order === 'desc' ? person2[sortField] : person1[sortField];
      const b = order === 'desc' ? person1[sortField] : person2[sortField];

      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }

      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }

      return 0;
    });
  }

  return preparedPeople;
}

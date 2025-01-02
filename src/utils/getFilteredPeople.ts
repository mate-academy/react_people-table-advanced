import { Person } from '../types';

interface Params {
  sex: string | null;
  query: string | null;
  centuries: string[] | null;
  sort: string | null;
  order: string | null;
}

export const filterBySex = (people: Person[], sex: string | null) => {
  if (!sex || sex === 'all') {
    return people;
  }

  return people.filter(person => person.sex === sex);
};

export const filterByQuery = (people: Person[], query: string | null) => {
  if (!query || !query.trim()) {
    return people;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return people.filter(
    person =>
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery),
  );
};

export const filterByCenturies = (
  people: Person[],
  centuries: string[] | null,
) => {
  if (!centuries || centuries.length === 0) {
    return people;
  }

  return people.filter(person => {
    if (!person.born) {
      return false;
    }

    const personCentury = Math.ceil(person.born / 100);

    return centuries.includes(personCentury.toString());
  });
};

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  if (!sort) {
    return people;
  }

  const sortedPeople = [...people];

  switch (sort) {
    case 'name':
      sortedPeople.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );
      break;
    case 'born':
    case 'died':
      sortedPeople.sort((a, b) => (a[sort] || 0) - (b[sort] || 0));
      break;
    case 'sex':
      sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

export const getFilteredPeople = (people: Person[], params: Params) => {
  const { sex, query, centuries, sort, order } = params;

  let filteredPeople = [...people];

  filteredPeople = filterBySex(filteredPeople, sex);
  filteredPeople = filterByQuery(filteredPeople, query);
  filteredPeople = filterByCenturies(filteredPeople, centuries);
  filteredPeople = sortPeople(filteredPeople, sort, order);

  return filteredPeople;
};

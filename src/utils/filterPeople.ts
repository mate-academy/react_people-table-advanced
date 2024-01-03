import { Person } from '../types';

export const filterPeople = (
  sourcePeople: Person[] | null,
  centuries: string[],
  sexFilter: string | null,
  query: string | null,
) => {
  if (!sourcePeople) {
    return null;
  }

  const centuriesFilter = centuries.map(century => (+century * 100));

  let filteredPeople = [...sourcePeople];

  if (sexFilter) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === sexFilter,
    );
  }

  if (query) {
    const queryLC = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person => (person.name.toLowerCase().includes(queryLC)
      || person.motherName?.toLowerCase().includes(queryLC)
      || person.name.toLowerCase().includes(queryLC)),
    );
  }

  if (centuriesFilter.length) {
    filteredPeople = filteredPeople.filter(
      person => centuriesFilter.some(year => (
        year >= person.born && (year - 100) < person.born
      )),
    );
  }

  return filteredPeople;
};

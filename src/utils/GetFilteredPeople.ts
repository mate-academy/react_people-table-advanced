import { Person } from '../types';

interface FilterOptions {
  query: string | null;
  sex: string | null;
  centuries: string[] | null;
}

export function getFilteredPeople(
  people: Person[],
  filterOptions: FilterOptions,
) {
  const { query, sex, centuries } = filterOptions;
  const normalisedQuery = query?.trim().toLowerCase();

  let filteredPeople = [...people];

  if (normalisedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      const normalisedName = person.name.trim().toLowerCase();

      return normalisedName.includes(normalisedQuery);
    });
  }

  if (centuries?.length) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(String(person.century));
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sex;
    });
  }

  return filteredPeople;
}

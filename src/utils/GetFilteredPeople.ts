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
  const normalizedQuery = query?.trim().toLowerCase();

  let filteredPeople = [...people];

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedName = person.name.trim().toLowerCase();
      const normalizedFatherName = person.father?.name.trim().toLowerCase();
      const normalizedMotherName = person.mother?.name.trim().toLowerCase();

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedFatherName?.includes(normalizedQuery) ||
        normalizedMotherName?.includes(normalizedQuery)
      );
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

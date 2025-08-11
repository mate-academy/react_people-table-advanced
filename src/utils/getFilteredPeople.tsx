import { Person } from '../types';

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
};

export const getFilteredPeople = (
  people: Person[],
  { sex, query, centuries }: Filters,
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedName = person.name.toLowerCase();
      const normalizedMotherName = person.motherName?.toLowerCase();
      const normalizedFatherName = person.fatherName?.toLowerCase();

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedMotherName?.includes(normalizedQuery) ||
        normalizedFatherName?.includes(normalizedQuery)
      );
    });
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  return filteredPeople;
};

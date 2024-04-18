import type { Person } from '../types';

export const getFilteredPeople = (
  sortedPeople: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let filteredPeople = [...sortedPeople];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(person => {
      const normalizedName = person.name.toLowerCase().trim();
      const normalizedFatherName = person.fatherName?.toLowerCase().trim();
      const normalizedMotherName = person.motherName?.toLowerCase().trim();

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedFatherName?.includes(normalizedQuery) ||
        normalizedMotherName?.includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (!!centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  return filteredPeople;
};

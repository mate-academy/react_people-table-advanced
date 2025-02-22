import { Person } from '../types';

type Filters = {
  sex: string | null;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export const getFilteredPeople = (
  people: Person[],
  { sex, query, centuries, sort, order }: Filters,
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

  if (sort) {
    filteredPeople.sort((currentPerson, nextPerson) => {
      const currentValue = currentPerson[sort as keyof Person];
      const nextValue = nextPerson[sort as keyof Person];

      let comparison = 0;

      if (typeof currentValue === 'string' && typeof nextValue === 'string') {
        comparison = currentValue.localeCompare(nextValue);
      } else if (
        typeof currentValue === 'number' &&
        typeof nextValue === 'number'
      ) {
        comparison = currentValue - nextValue;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    });
  }

  return filteredPeople;
};

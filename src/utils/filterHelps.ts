import { Person } from '../types';

export type Filter = 'all' | 'male' | 'female';

const getCentury = (year: number): string => {
  return Math.ceil(year / 100).toString();
};

export function getFilteredPeople(
  currentPeople: Person[],
  currentFilter: Filter,
  query?: string,
  centuries?: string[],
) {
  let filteredPeople = [...currentPeople];

  if (currentFilter === 'male') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  if (currentFilter === 'female') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'f');
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        !query ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries && centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(getCentury(person.born)),
    );
  }

  return filteredPeople;
}

export function getSortedPeople(
  filteredPeople: Person[],
  sortBy: string | null,
  order: string | null = null,
) {
  if (!sortBy) {
    return filteredPeople;
  }

  const sortedPeople = [...filteredPeople];

  sortedPeople.sort((a, b) => {
    const aValue = a[sortBy as keyof Person];
    const bValue = b[sortBy as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'desc' ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  return sortedPeople;
}
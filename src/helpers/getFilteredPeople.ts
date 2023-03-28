import { SexFilterType } from '../enums/SexFilterType';
import { Person } from '../types';

const isQueryInValues = (query: string, values: string[]): boolean => {
  return values.some((value) => value.toLowerCase().includes(query));
};

const getCentury = (year: number): number => {
  let century = Math.ceil(year / 100);

  if (year % 100 === 0) {
    century -= 1;
  }

  return century;
};

export const getFilteredPeople = (
  people: Person[],
  sexFilter: SexFilterType,
  query: string,
  centuries: number[],
): Person[] => {
  let filteredPeople = [...people];

  if (sexFilter !== SexFilterType.All) {
    filteredPeople = filteredPeople.filter(({ sex }) => sex === sexFilter);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(
      ({ born }) => centuries.includes(getCentury(born)),
    );
  }

  if (query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return people.filter(({
      name,
      fatherName,
      motherName,
    }) => {
      return isQueryInValues(normalizedQuery, [
        name,
        motherName ?? '',
        fatherName ?? '',
      ]);
    });
  }

  return filteredPeople;
};

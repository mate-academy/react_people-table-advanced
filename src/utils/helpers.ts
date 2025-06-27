import { Person, Sex, SortBy, SortOrder } from '../types';

export const getCenturyFromYear = (year: number): number => {
  return Math.ceil(year / 100);
};

export const getAge = (person: Person): number | undefined => {
  if (!person.born) {
    return undefined;
  }

  const currentYear = new Date().getFullYear();
  const age =
    person.died && person.died !== 0
      ? person.died - person.born
      : currentYear - person.born;

  if (age < 0) {
    return undefined;
  }

  return age;
};

export const getSearchParamsAsArray = (
  params: URLSearchParams,
  paramName: string,
): string[] => {
  return params.getAll(paramName);
};

export const applyFilters = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  let filteredPeople = [...people];

  const selectedCenturies = searchParams.getAll('centuries');

  if (selectedCenturies.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      if (person.born) {
        const century = getCenturyFromYear(person.born);

        return selectedCenturies.includes(century.toString());
      }

      return false;
    });
  }

  const selectedSex = searchParams.get('sex') as Sex | null;

  if (selectedSex) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === selectedSex,
    );
  }

  const nameQuery = searchParams.get('query')?.toLowerCase();

  if (nameQuery) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(nameQuery),
    );
  }

  return filteredPeople;
};

export const applySort = (
  people: Person[],
  sortBy: SortBy | null,
  order: SortOrder | null,
): Person[] => {
  if (!sortBy || !order) {
    return [...people];
  }

  const sortedPeople = [...people];

  sortedPeople.sort((a, b) => {
    const rawValueA = a[sortBy];
    const rawValueB = b[sortBy];

    let valueA: string | number | typeof Infinity;
    let valueB: string | number | typeof Infinity;

    if (sortBy === 'born' || sortBy === 'died') {
      valueA =
        rawValueA === 0 || rawValueA === null || rawValueA === undefined
          ? Infinity
          : (rawValueA as number);
      valueB =
        rawValueB === 0 || rawValueB === null || rawValueB === undefined
          ? Infinity
          : (rawValueB as number);
    } else {
      valueA =
        typeof rawValueA === 'string'
          ? rawValueA.toLowerCase()
          : (rawValueA as number);
      valueB =
        typeof rawValueB === 'string'
          ? rawValueB.toLowerCase()
          : (rawValueB as number);
    }

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }

    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return sortedPeople;
};

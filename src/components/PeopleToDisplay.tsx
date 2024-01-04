import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

const useQueryFilter = (query: string | null, people: Person[]): Person[] => {
  if (!query) {
    return people;
  }

  const searchedQuery = query.toLowerCase();

  return people.filter(
    (person) => person.name.toLowerCase().includes(searchedQuery)
      || person.sex.toLowerCase().includes(searchedQuery),
  );
};

const useSexFilter = (sex: string, people: Person[]): Person[] => {
  if (!sex) {
    return people;
  }

  return people.filter((person) => person.sex === sex);
};

const useCenturiesFilter = (
  centuries: string[],
  people: Person[],
): Person[] => {
  if (centuries.length === 0) {
    return people;
  }

  return people.filter((person) => centuries
    .includes(Math.ceil(Number(person.born) / 100).toString()));
};

const useSort = (
  sortBy: string,
  sortOrder: string,
  people: Person[],
): Person[] => {
  const sortedPeople = [...people];

  switch (sortBy) {
    case 'name':
      sortedPeople.sort((a, b) => (sortOrder === 'ASC'
        ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
      break;
    case 'sex':
      sortedPeople.sort((a, b) => (sortOrder === 'ASC'
        ? a.sex.localeCompare(b.sex) : b.sex.localeCompare(a.sex)));
      break;
    case 'born':
    case 'died':
      sortedPeople.sort((a, b) => (sortOrder
        === 'ASC' ? a.born - b.born : b.born - a.born));
      break;
    default:
      break;
  }

  return sortedPeople;
};

export const PeopleToDisplay = (people: Person[]): Person[] => {
  const [searchParams] = useSearchParams();
  const queryFilter = useQueryFilter(
    searchParams.get('query'),
    useSexFilter(
      searchParams.get('sex') || '',
      useCenturiesFilter(searchParams
        .getAll('centuries') || [], people),
    ),
  );

  const sortOrder = searchParams.get('sortOrder') || '';
  const sortBy = searchParams.get('sort') || '';
  const filteredAndSortedPeople = useSort(sortBy, sortOrder, queryFilter);

  return useMemo(() => filteredAndSortedPeople, [filteredAndSortedPeople]);
};

import { Person } from '../types';
import { getFilterByQuery } from './getFilterByQuery';
import { getFilters } from './getFilters';

export const getFilteredPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  let currentPeople = people;

  const { filterBySex, filterByQuery, centuries } = getFilters(searchParams);

  const normalizeQuery = filterByQuery.toLowerCase();

  if (filterBySex) {
    currentPeople = currentPeople.filter(item => item.sex === filterBySex);
  }

  if (filterByQuery) {
    currentPeople = getFilterByQuery(currentPeople, normalizeQuery);
  }

  if (centuries.length) {
    currentPeople = currentPeople.filter(item =>
      centuries.includes(Math.ceil(item.born / 100).toString()),
    );
  }

  return currentPeople;
};

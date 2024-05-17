// import { useSearchParams } from 'react-router-dom';
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

  if (filterBySex === 'm') {
    currentPeople = currentPeople.filter(item => item.sex === 'm');
  }

  if (filterBySex === 'f') {
    currentPeople = currentPeople.filter(item => item.sex === 'f');
  }

  if (filterByQuery) {
    currentPeople = getFilterByQuery(people, normalizeQuery);
  }

  if (centuries.length) {
    currentPeople = currentPeople.filter(item =>
      centuries.includes(Math.ceil(item.born / 100).toString()),
    );
  }

  return currentPeople;
};

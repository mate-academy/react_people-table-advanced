import { Person } from '../types';
import { getFilteredPeople } from './getFilteredPeople';
import { sortPeople } from './sortPeopleBy';

export const applySearchAndFilter = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const stringParams = searchParams.toString();

  if (!stringParams) {
    return people;
  }

  let currentPeople = people;

  if (stringParams.includes('centuries')
    || stringParams.includes('sex=')
    || stringParams.includes('query')
  ) {
    currentPeople = getFilteredPeople(people, searchParams);
  }

  if (stringParams.includes('sort') && currentPeople.length) {
    currentPeople = sortPeople(currentPeople, searchParams);
  }

  return currentPeople;
};

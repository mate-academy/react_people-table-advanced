import { Person } from '../types/Person';
import { SortConfig } from '../types/SortConfig';
import { getFilteredPeople } from './getPeopleFiltered';
import { getSortedPeople } from './getSortedPeople';

export const preparedPeople = (
  people: Person[],
  query: string,
  sortConfig: SortConfig,
): Person[] => {
  const filtered = getFilteredPeople(people, query);

  return getSortedPeople(filtered, sortConfig);
};

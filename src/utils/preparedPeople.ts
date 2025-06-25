import { Person } from '../types/Person';
import { SortDirection } from '../types/SortDirection';
import { SortFields } from '../types/SortFields';
import { getFilteredPeople } from './getPeopleFiltered';
import { getSortedPeople } from './getSortedPeople';

export const preparedPeople = (
  people: Person[],
  query: string,
  columnName: SortFields | null,
  direction: SortDirection,
): Person[] => {
  const filteredPeople = getFilteredPeople(people, query);

  getSortedPeople(filteredPeople, columnName, direction);

  return filteredPeople;
};

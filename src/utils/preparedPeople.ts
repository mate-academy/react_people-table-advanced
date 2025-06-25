import { FilterService } from '../types/FiltersService/FilterService';
import { Person } from '../types/Person';
import { SortDirection } from '../types/SortDirection';
import { SortFields } from '../types/SortFields';
import { getFilteredPeople } from './getPeopleFiltered';
import { getSortedPeople } from './getSortedPeople';

export const preparedPeople = (
  people: Person[],
  filters: FilterService,
  columnName: SortFields | null,
  direction: SortDirection,
): Person[] => {
  const filteredPeople = getFilteredPeople(people, filters);

  getSortedPeople(filteredPeople, columnName, direction);

  return filteredPeople;
};

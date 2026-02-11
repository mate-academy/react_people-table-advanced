import { Person } from '../types';
import { SortOptions } from '../types/SortOptions';
import { SortOrders } from '../types/SortOrders';
import { getSortedPeople } from './getSortedPeople';

export const getFilteredPeople = (
  people: Person[],
  filterBySex: string | null,
  query: string,
  centuries: string[],
  sortOption: SortOptions,
  sortOrder?: SortOrders,
) => {
  let newPeople = [...people];
  const normalizedQuery = query.trim().toLowerCase();

  if (centuries.length > 0) {
    const normalizedCenturies = centuries.map(century => +century);

    newPeople = newPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return normalizedCenturies.includes(bornCentury);
    });
  }

  if (normalizedQuery !== '') {
    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filterBySex) {
    newPeople = newPeople.filter(person => person.sex === filterBySex);
  }

  if (sortOption) {
    const direction = sortOrder === SortOrders.Descendant ? -1 : 1;

    newPeople = getSortedPeople(newPeople, sortOption, direction);
  }

  return newPeople;
};

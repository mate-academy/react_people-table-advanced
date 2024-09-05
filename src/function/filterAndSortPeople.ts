import { Person } from '../types';
import { Order, SortBy } from '../types/Order';
import { filterPeople } from './filterFunction';

export function filterAndSortPeople(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string | null,
  sortField: SortBy | '',
  sortOrder: Order | '',
): Person[] {
  const filteredPeople = filterPeople([...people], query, centuries, sex);

  if (sortField) {
    filteredPeople.sort((a, b) => {
      const fieldA = a[sortField as keyof Person];
      const fieldB = b[sortField as keyof Person];

      if (fieldA && fieldB) {
        return sortOrder === Order.desc
          ? fieldB > fieldA
            ? 1
            : -1
          : fieldA > fieldB
            ? 1
            : -1;
      }

      return 0;
    });
  }

  return filteredPeople;
}

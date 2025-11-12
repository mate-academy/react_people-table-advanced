import { Order, Person, SortField } from '../types';

type Sort = {
  sortField: SortField;
  order: Order;
};

export function getSortedPeople(
  people: Person[],
  sort?: Sort | null,
): Person[] {
  if (!sort || !sort.sortField) {
    return people;
  }

  const { sortField, order } = sort;

  const sortedPeople = [...people].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return 0;
  });

  return order === 'desc' ? sortedPeople.reverse() : sortedPeople;
}

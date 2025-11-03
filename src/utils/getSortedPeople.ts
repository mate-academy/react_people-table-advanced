import { Order, Person } from '../types';

type Sort = {
  field: keyof Person | null;
  order: Order;
};

export function getSortedPeople(people: Person[], sort: Sort): Person[] {
  const { field: sortField, order } = sort;

  if (!sortField) {
    return people;
  }

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

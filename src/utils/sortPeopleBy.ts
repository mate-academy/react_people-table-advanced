import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order') ? -1 : 1;

  if (!sortField || !people.length || !(sortField in people[0])) {
    return people;
  }

  return [...people].sort((a: Person, b: Person) => {
    const item1 = a[sortField as keyof Person];
    const item2 = b[sortField as keyof Person];

    if (typeof item1 === 'string' && typeof item2 === 'string') {
      return item1.localeCompare(item2) * order;
    }

    if (typeof item1 === 'number' && typeof item2 === 'number') {
      return (item1 - item2) * order;
    }

    return 0;
  });
};

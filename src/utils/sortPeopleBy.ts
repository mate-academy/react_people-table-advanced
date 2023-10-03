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
    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * order;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * order;
    }

    return 0;
  });
};

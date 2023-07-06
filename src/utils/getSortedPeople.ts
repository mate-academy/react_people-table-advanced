import { Person } from '../types';

export function getSortedPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let sortedPeople = [...people];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort === 'name' || sort === 'sex') {
    sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
  }

  if (sort === 'born' || sort === 'died') {
    sortedPeople.sort((a, b) => +a[sort] - +b[sort]);
  }

  if (order) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
}

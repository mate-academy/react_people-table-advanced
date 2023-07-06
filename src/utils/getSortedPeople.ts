import { Person } from '../types';

interface Params {
  sort: string | null,
  order: string | null,
}

export function getSortedPeople(
  people: Person[],
  params: Params,
) {
  let sortedPeople = [...people];
  const { sort, order } = params;

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

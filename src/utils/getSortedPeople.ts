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

  switch (sort) {
    case 'name':
    case 'sex':
      sortedPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
      break;
    case 'born':
    case 'died':
      sortedPeople.sort((a, b) => +a[sort] - +b[sort]);
      break;
    default:
      break;
  }

  if (order) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
}

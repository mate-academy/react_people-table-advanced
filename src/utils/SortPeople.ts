import { Person } from '../types';

export function sortPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  let sortedPeople = people;

  switch (sort) {
    case 'name':
    case 'sex':
      sortedPeople = [...people].sort((x, y) => {
        return x[sort].localeCompare(y[sort]);
      });

      break;
    case 'born':
    case 'died':
      sortedPeople = [...people].sort((x, y) => {
        return +x[sort] - +y[sort];
      });

      break;
    default:
      break;
  }

  if (order) {
    return sortedPeople.reverse();
  }

  return sortedPeople;
}

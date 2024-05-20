import { DEFAULT_SORT_ORDER } from '../constants';
import { Person } from '../types';
import { Sorts } from '../types/Sorts';

export const getSortedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let currentPeople = people;

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  switch (sort) {
    case Sorts.name || Sorts.sex:
      currentPeople = currentPeople.sort((a, b) =>
        a[sort].localeCompare(b[sort]),
      );
      break;
    case Sorts.born || Sorts.died:
      currentPeople = currentPeople.sort((a, b) => a[sort] - b[sort]);
      break;
    default:
      break;
  }

  if (order === DEFAULT_SORT_ORDER) {
    currentPeople = currentPeople.reverse();
  }

  return currentPeople;
};

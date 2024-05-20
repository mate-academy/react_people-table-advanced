import { defaultSortOrder } from '../constants';
import { Person } from '../types';
import { Sorts } from '../types/Sorts';

export const getSortedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let currentPeople = people;

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort === Sorts.name || sort === Sorts.sex) {
    currentPeople = currentPeople.sort((a, b) =>
      a[sort].localeCompare(b[sort]),
    );
  }

  if (sort === Sorts.born || sort === Sorts.died) {
    currentPeople = currentPeople.sort((a, b) => a[sort] - b[sort]);
  }

  if (order === defaultSortOrder) {
    currentPeople = currentPeople.reverse();
  }

  return currentPeople;
};

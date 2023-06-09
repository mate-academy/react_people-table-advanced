import { Person } from '../types';
import { Sort } from '../types/Sorts';

export const sortPeople = (
  people: Person[],
  order: string | null,
  sort: string | null,
) => {
  let sortedPeople = [...people];

  switch (sort) {
    case (Sort.Name):
    case (Sort.Sex):
      if (order) {
        sortedPeople = sortedPeople.sort((prev, cur) => {
          return cur[sort].localeCompare(prev[sort]);
        });
      } else if (!order) {
        sortedPeople = sortedPeople.sort((prev, cur) => {
          return prev[sort].localeCompare(cur[sort]);
        });
      }

      return sortedPeople;

    case (Sort.Born):
    case (Sort.Died):
      if (order) {
        sortedPeople = sortedPeople.sort((prev, cur) => {
          return cur[sort] - prev[sort];
        });
      } else if (!order) {
        sortedPeople = sortedPeople.sort((prev, cur) => {
          return cur[sort] - (prev[sort]);
        });
      }

      return sortedPeople;

    default:
      return sortedPeople;
  }
};

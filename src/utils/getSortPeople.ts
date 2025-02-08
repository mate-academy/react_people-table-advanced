import { Person } from '../types';
import { Order } from '../types/Order';
import { isNumber, isString } from './typeOfValue';

const SORT_FILTERS = {
  asc: (people: Person[], field: keyof Person) => {
    return [...people].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (isNumber(valueA) && isNumber(valueB)) {
        return valueA - valueB;
      }

      if (isString(valueA) && isString(valueB)) {
        return valueA.localeCompare(valueB);
      }

      return 0;
    });
  },

  desc: (people: Person[], field: keyof Person) => {
    return [...people].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (isNumber(valueA) && isNumber(valueB)) {
        return valueB - valueA;
      }

      if (isString(valueA) && isString(valueB)) {
        return valueB.localeCompare(valueA);
      }

      return 0;
    });
  },
};

const toDefaultOrder = (order: Order | null) => {
  return !order ? 'asc' : order;
};

const getSortFunction = (order: Order) => SORT_FILTERS[order];

export const getNextSortOrder = (
  sort: keyof Person | null,
  order: Order | null,
) => {
  if (!sort && !order) {
    return null;
  }

  if (sort && !order) {
    return 'desc';
  }

  return null;
};

export const getSortedPeople = (
  people: Person[],
  { sort, order }: { sort: keyof Person | null; order: Order | null },
) => {
  if (!sort) {
    return people;
  }

  const sortPeople = getSortFunction(toDefaultOrder(order));

  return sortPeople(people, sort);
};

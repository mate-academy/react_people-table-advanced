import { Person } from '../types';

interface SortParams {
  sort: string;
  order: string;
}

export const getSortedPeople = (sortParams: SortParams, people: Person[]) => {
  const { sort, order } = sortParams;

  if (!sort) {
    return people;
  }

  return [...people].sort((a, b) => {
    const aField = a[sort];
    const bField = b[sort];

    const result =
      typeof aField === 'string'
        ? aField.localeCompare(bField)
        : aField - bField;

    return order ? result * -1 : result;
  });
};

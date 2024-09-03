import { Person } from '../types';
import { SortField, SortOrder } from '../types/SortTypes';

export const sortPeople = (
  people: Person[],
  sort: SortField,
  order: SortOrder,
): Person[] => {
  return people.sort((a, b) => {
    let result = 0;
    const firstVal = a[sort];
    const secondVal = b[sort];

    if (typeof firstVal === 'string' && typeof secondVal === 'string') {
      result = firstVal.localeCompare(secondVal);
    } else if (typeof firstVal === 'number' && typeof secondVal === 'number') {
      result = firstVal - secondVal;
    }

    return order === SortOrder.Desc ? result * -1 : result;
  });
};

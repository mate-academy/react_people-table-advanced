import { ColumnsSortedDirection } from '../types/ColumnsSortedDirection';

export const chooseDirection = (
  el1: string | number,
  el2: string | number,
  direction: string,
): number => {
  if (typeof el1 === 'string' && typeof el2 === 'string') {
    return direction === ColumnsSortedDirection.DESC
      ? el2.localeCompare(el1)
      : el1.localeCompare(el2);
  }

  if (typeof el1 === 'number' && typeof el2 === 'number') {
    return direction === ColumnsSortedDirection.DESC ? el2 - el1 : el1 - el2;
  }

  return 0;
};

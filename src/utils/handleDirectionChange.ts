import { Constans } from '../types';

export const handleDirectionChange = (
  sortName: string,
  sort: string | null,
  direction: string | null,
) => {
  if (!sort) {
    return { sort: sortName, direction: null };
  }

  if (sortName && !direction) {
    return { sort: sortName, direction: Constans.DESC };
  }

  if (sortName && direction) {
    return { sort: null, direction: null };
  }

  if (!sortName && !direction) {
    return { sort: null, direction: null };
  }

  return { sort: sortName, direction: null };
};

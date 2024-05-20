import { DEFAULT_SORT_ORDER } from '../constants';
import { SortsParamsType } from '../types/SortsParamsType';
import { Sorts } from '../types/Sorts';

export const getSortByParams = (
  orderParam: string,
  sortParam: string,
  currentSort: Sorts,
) => {
  const currentParams: Partial<SortsParamsType> = {};

  if (sortParam && sortParam === currentSort) {
    currentParams.sort = currentSort;
    currentParams.order = DEFAULT_SORT_ORDER;
  }

  if (sortParam && orderParam) {
    currentParams.sort = null;
    currentParams.order = null;
  }

  if (sortParam !== currentSort) {
    currentParams.sort = currentSort;
  }

  return currentParams;
};

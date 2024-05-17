import { defaultSortOrder } from '../constants';
import { CurrentParamsType } from '../types/CurrentParamsType';
import { Sorts } from '../types/Sorts';

export const getSortByParams = (
  orderParam: string,
  sortParam: string,
  sort: Sorts,
) => {
  const currentParams: Partial<CurrentParamsType> = {};

  if (sortParam && sortParam === sort) {
    currentParams.sort = sort;
    currentParams.order = defaultSortOrder;
  }

  if (sortParam && orderParam) {
    currentParams.sort = null;
    currentParams.order = null;
  }

  if (sortParam !== sort) {
    currentParams.sort = sort;
  }

  return currentParams;
};

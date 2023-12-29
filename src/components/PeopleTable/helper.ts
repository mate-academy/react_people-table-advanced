import { SortOrder } from '../../types/SortOrder';
import { SortType } from '../../types/SortType';

const sortOrtder = 'order';

export const getSortOrder = (searchparams: URLSearchParams) => {
  const order = searchparams.get(sortOrtder);

  if (!order) {
    return SortOrder.Asc;
  }

  if (order === SortOrder.Asc) {
    return SortOrder.Desc;
  }

  return null;
};

export const getArrowClass = (
  searchparams: URLSearchParams, sortType: SortType,
) => {
  const order = searchparams.get(sortOrtder);
  const type = searchparams.get('sort');

  if (type === sortType && order === SortOrder.Asc) {
    return 'fa-sort-up';
  }

  if (type === sortType && order === SortOrder.Desc) {
    return 'fa-sort-down';
  }

  return 'fa-sort';
};

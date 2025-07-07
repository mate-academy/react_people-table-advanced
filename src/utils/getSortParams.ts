import { OrderTypeEnum, SortFieldEnum } from '../types';

export const getSortParams = (
  sortField: SortFieldEnum,
  sortBy: SortFieldEnum | null,
  order: OrderTypeEnum | null,
) => {
  if (sortBy !== sortField) {
    return { sort: sortField, order: null };
  }

  if (!order) {
    return { sort: sortField, order: OrderTypeEnum.Desc };
  }

  return { sort: null, order: null };
};

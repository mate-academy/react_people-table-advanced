import {
  SortByPersonInfo,
  SortOrder,
} from '../types/typesSorts/SortByPersonInfo';

export const getSortType = (type: string) : SortByPersonInfo => {
  switch (type) {
    case SortByPersonInfo.NAME:
      return SortByPersonInfo.NAME;

    case SortByPersonInfo.SEX:
      return SortByPersonInfo.SEX;

    case SortByPersonInfo.BORN:
      return SortByPersonInfo.BORN;

    case SortByPersonInfo.DIED:
      return SortByPersonInfo.DIED;

    default:
      return SortByPersonInfo.NONE;
  }
};

export const getSortOrder = (order: string): SortOrder => {
  return order === SortOrder.DESC
    ? SortOrder.DESC
    : SortOrder.ASC;
};

export const getSortingSearchParams = (
  type: SortByPersonInfo,
  sort: SortByPersonInfo,
  order: SortOrder,
) => {
  const isSorted = sort === type;
  const isReversed = order === SortOrder.DESC;

  const sortParam = isSorted && isReversed
    ? null
    : type;

  const orderParam = isSorted && !isReversed
    ? SortOrder.DESC
    : null;

  return {
    sort: sortParam,
    order: orderParam,
  };
};

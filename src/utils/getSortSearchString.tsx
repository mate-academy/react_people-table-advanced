import { getSearchWith } from './searchHelper';
import { SortParams } from '../types/SortParams';
import { SortType } from '../types/SortType';

export const getSortSearchString = (
  searchParams: URLSearchParams,
  type: SortType,
): string => {
  const sortNameParams = searchParams.get(SortParams.Sort);
  const orderParams = searchParams.get(SortParams.Order);

  switch (true) {
    case sortNameParams === type && !orderParams:
      return getSearchWith(
        searchParams, { [SortParams.Order]: 'desc' },
      );

    case sortNameParams !== type:
      return getSearchWith(
        searchParams, {
          [SortParams.Sort]: type,
          [SortParams.Order]: null,
        },
      );

    case (sortNameParams === type && !!orderParams):
      return getSearchWith(
        searchParams, {
          [SortParams.Sort]: null,
          [SortParams.Order]: null,
        },
      );

    default:
      return '';
  }
};

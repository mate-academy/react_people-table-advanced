import { getSearchWith } from './searchHelper';

export const getSearchSort = (
  sortType: string,
  searchParams: URLSearchParams,
  sort: string | null,
  isReversed: boolean,
) => {
  if (!sort || sort !== sortType) {
    return getSearchWith(searchParams, {
      sort: sortType,
    });
  }

  if (!isReversed) {
    return getSearchWith(searchParams, {
      order: 'desc',
    });
  }

  return getSearchWith(searchParams, {
    order: null,
    sort: null,
  });
};

import { getSearchWith } from '../utils/searchHelper';

export const updateSearchParams = (
  searchParams: URLSearchParams,
  updatedParams: Record<string, string | string[] | null>,
) => {
  const newSearchString = getSearchWith(searchParams, updatedParams);

  return newSearchString;
};

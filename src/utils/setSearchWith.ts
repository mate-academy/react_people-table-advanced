import { getSearchWith } from './searchHelper';

export const setSearchWith = (
  currentParams: URLSearchParams,
  nextParams: any,
  setParams: (params: string) => void,
) => {
  const newParams = getSearchWith(currentParams, nextParams);

  setParams(newParams);
};

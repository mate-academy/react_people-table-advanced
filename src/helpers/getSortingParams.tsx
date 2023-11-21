import { SearchParams } from '../utils/searchHelper';

export function getSortingParams(
  sort: string | null,
  order: string | null,
  value: string,
) {
  const sortingParams: SearchParams = {
    sort: null,
    order: null,
  };

  if (!sort) {
    sortingParams.sort = value;
  }

  if (sort && sort !== value) {
    sortingParams.sort = value;
  }

  if (sort === value && !order) {
    sortingParams.sort = value;
    sortingParams.order = 'desc';
  }

  return sortingParams;
}

import { SearchParams } from './searchHelper';

export function getSortingOptions(
  sort: string | null,
  order: string | null,
  value: string,
) {
  const sortingOptions: SearchParams = {
    sort: null,
    order: null,
  };

  if (!sort) {
    sortingOptions.sort = value;
  }

  if (sort && sort !== value) {
    sortingOptions.sort = value;
  }

  if (sort === value && !order) {
    sortingOptions.sort = value;
    sortingOptions.order = 'desc';
  }

  return sortingOptions;
}

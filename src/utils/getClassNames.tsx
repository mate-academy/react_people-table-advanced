import { SortParams } from '../types/SortParams';
import { SortType } from '../types/SortType';


export const getClassNames = (
  searchParams: URLSearchParams,
  type: SortType
) => {
  switch (true) {
    case (searchParams.get(SortParams.Sort) === type
      && !searchParams.has(SortParams.Order)):
      return 'fas fa-sort-up';

    case (searchParams.get(SortParams.Sort) === type
      && searchParams.has(SortParams.Order)):
      return 'fas fa-sort-down';

    default:
      return 'fas fa-sort';
  }
};

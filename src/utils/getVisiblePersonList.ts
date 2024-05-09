import { Person } from '../types';
import { FilterSortParams } from '../types/FilterSortParams';
import { getFilteredPersonList } from './getFilteredPersonList';
import { getSortedPersonList } from './getSortedPersonList';

export function getVisiblePersonList(
  data: Person[],
  filterParams: FilterSortParams,
) {
  const { query, filterStatus, centuries, sort, order } = filterParams;

  let resultData = getFilteredPersonList(
    [...data],
    filterStatus,
    query,
    centuries,
  );

  if (sort) {
    resultData = getSortedPersonList(resultData, sort);
  }

  if (order === 'desc') {
    resultData.reverse();
  }

  return resultData;
}

import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../../utils/searchHelper';

export const usePeopleSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const setNewSortParams = (paramsToUpdate: SearchParams) => {
    const newParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newParams);
  };

  const toggleSort = (sortBy: string) => {
    const isCurrentSort = currentSort === sortBy;

    if (!isCurrentSort) {
      setNewSortParams({ sort: sortBy });
    } else if (isCurrentSort && !currentOrder) {
      setNewSortParams({ order: 'desc' });
    } else {
      setNewSortParams({ sort: null, order: null });
    }
  };

  const getSortIconClass = (columnTitle: string): string => {
    const isSorted = currentSort === columnTitle;

    if (!isSorted) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return {
    toggleSort,
    getSortIconClass,
    currentSort,
    currentOrder,
    setNewSortParams,
  };
};

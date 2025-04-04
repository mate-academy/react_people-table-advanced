import { SearchParams } from '../../../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

export const usePeopleSortParams = () => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const toggleSort = (sortBy: string): SearchParams => {
    const isCurrentSort = currentSort === sortBy;

    if (!isCurrentSort) {
      return { sort: sortBy, order: null };
    } else if (isCurrentSort && !currentOrder) {
      return { sort: sortBy, order: 'desc' };
    } else {
      return { sort: null, order: null };
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
  };
};

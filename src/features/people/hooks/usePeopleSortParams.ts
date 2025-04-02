import { useSearchParamsUpdater } from './useSearchParamsUpdater';

export const usePeopleSortParams = () => {
  const { searchParams, updateParams } = useSearchParamsUpdater();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const toggleSort = (sortBy: string) => {
    const isCurrentSort = currentSort === sortBy;

    if (!isCurrentSort) {
      updateParams({ sort: sortBy });
    } else if (isCurrentSort && !currentOrder) {
      updateParams({ order: 'desc' });
    } else {
      updateParams({ sort: null, order: null });
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

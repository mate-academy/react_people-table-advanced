import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexInSearch = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const cents = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const hasAnySearchParam = sexInSearch !== null || !!query || cents.length > 0;

  const handleSorting = (sortBy: string | null) => {
    const lowerSortBy = sortBy ? sortBy.toLowerCase() : '';
    const isSortSameAsArgument = sort === lowerSortBy;

    if (!sort || sort !== lowerSortBy) {
      return getSearchWith(searchParams, { sort: lowerSortBy, order: null });
    }

    if (sort && !order && isSortSameAsArgument) {
      return getSearchWith(searchParams, { sort: lowerSortBy, order: 'desc' });
    }

    if (sort && order && isSortSameAsArgument) {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    return '';
  };

  return {
    searchParams,
    setSearchParams,
    sexInSearch,
    query,
    cents,
    sort,
    order,
    hasAnySearchParam,
    handleSorting,
  };
};

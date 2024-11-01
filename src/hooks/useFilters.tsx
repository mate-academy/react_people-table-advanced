import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const { personSlug } = useParams<string>();

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(current => getSearchWith(current, params));
  };

  const handleSetQuery = (newValue: string) => {
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, { query: newValue || null }),
      ),
    );
  };

  const getCenturiesParams = (century: string) => {
    return centuries?.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];
  };

  function handleSorting(sortField: string) {
    return sort !== sortField
      ? getSearchWith(searchParams, { sort: sortField, order: null })
      : !order
        ? getSearchWith(searchParams, { order: 'desc' })
        : getSearchWith(searchParams, { order: null, sort: null });
  }

  return {
    sex,
    query,
    centuries,
    sort,
    order,
    searchParams,
    personSlug,
    setSearchParams,
    setSearchWith,
    handleSetQuery,
    getCenturiesParams,
    handleSorting,
  };
};

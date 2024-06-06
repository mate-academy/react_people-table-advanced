import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const usePeopleParams = () => {
  const [params, setParams] = useSearchParams();

  const setQuery = useCallback(
    (query: string) =>
      setParams(prev => getSearchWith(prev, { query: query || null })),
    [setParams],
  );

  return {
    sex: params.get('sex'),
    query: params.get('query') || '',
    setQuery,
    centauries: params.getAll('centauries'),
    sort: params.get('sort'),
    order: params.get('order'),
  };
};

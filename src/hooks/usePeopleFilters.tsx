import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const usePeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    query: searchParams.get('query') || '',
    sex: searchParams.get('sex') || '',
    centuries: searchParams.getAll('centuries'),
    updateFilters: (params: { [key: string]: string | string[] | null }) => {
      setSearchParams(getSearchWith(searchParams, params));
    },
  };
};

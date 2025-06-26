import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const usePeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexSearchParam = searchParams.get('sex') || '';
  const querySearchParam = searchParams.get('query') || '';
  const centuriesSearchParams = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(params);
  };

  const toggleCenturiesSearchParams = (era: string) => {
    return centuriesSearchParams.includes(era)
      ? centuriesSearchParams.filter(century => century !== era)
      : [...centuriesSearchParams, era];
  };

  const resetAll = () => {
    return {
      sex: null,
      query: null,
      centuries: null,
    };
  };

  return {
    sexSearchParam,
    querySearchParam,
    centuriesSearchParams,
    handleQueryChange,
    toggleCenturiesSearchParams,
    resetAll,
  };
};

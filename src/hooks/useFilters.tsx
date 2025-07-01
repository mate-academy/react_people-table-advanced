import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { CenturyFilters } from '../types/CenturyFilters';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSex = searchParams.get('sex') || 'all';

  const centuries: CenturyFilters[] = ['16', '17', '18', '19', '20'];
  const activeCentury = searchParams.getAll('centuries');

  const query = searchParams.get('query') || '';
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const newParams = getSearchWith(searchParams, {
      query: value.length ? value : null,
    });

    setSearchParams(newParams);
  };

  return {
    centuries,
    activeCentury,
    activeSex,
    query,
    handleQueryChange,
  };
};

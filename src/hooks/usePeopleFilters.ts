import { useSearchParams } from 'react-router-dom';
import { KeyProps } from '../types/KeyProps';

export function usePeopleFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFilter = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') as 'm' | 'f' | null;
  const centuryFilter = searchParams.getAll('centuries').map(Number);

  const sortKey = searchParams.get('sort') as KeyProps;
  const sortOrder = (searchParams.get('order') as 'asc' | 'desc') || 'asc';

  const setSexFilter = (sex: 'm' | 'f' | null) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const setQueryFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuryFilter.includes(century)
      ? centuryFilter.filter(c => c !== century)
      : [...centuryFilter, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c.toString()));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const resetAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    setSearchParams(params);
  };

  return {
    sexFilter,
    queryFilter,
    centuryFilter,
    setSexFilter,
    setQueryFilter,
    toggleCentury,
    clearCenturies,
    resetAll,
    sortKey,
    sortOrder,
  };
}

import { useSearchParams } from 'react-router-dom';

export const usePeopleFilterParams = () => {
  const [searchParams] = useSearchParams();
  const currentSexFilter = searchParams.get('sex');
  const currentCenturiesFilter = searchParams.getAll('centuries');
  const currentQueryFilter = searchParams.get('query');

  return {
    currentSexFilter,
    currentCenturiesFilter,
    currentQueryFilter,
  };
};

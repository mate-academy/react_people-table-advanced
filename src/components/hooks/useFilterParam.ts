import { useSearchParams } from 'react-router-dom';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');
  const selectedGenders = searchParams.getAll('sex');
  const query = searchParams.get('query') || '';

  return {
    searchParams,
    setSearchParams,
    selectedCenturies,
    selectedGenders,
    query,
  };
};

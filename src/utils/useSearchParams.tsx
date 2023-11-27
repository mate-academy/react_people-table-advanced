import { useSearchParams as useRouterSearchParams } from 'react-router-dom';

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRouterSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuriesUrl = searchParams.getAll('centuries') || [];

  return {
    searchParams,
    setSearchParams,
    query,
    sex,
    centuriesUrl,
  };
};

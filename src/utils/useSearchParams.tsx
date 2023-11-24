import { useSearchParams as useRouterSearchParams } from 'react-router-dom';

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuriesUrl = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  return {
    searchParams,
    setSearchParams,
    sex,
    centuriesUrl,
    query,
  };
};

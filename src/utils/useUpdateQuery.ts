import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from './searchHelper';

export const useUpdateQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = (newQuery: string | null) => {
    const newParams = getSearchWith(searchParams, { query: newQuery });

    setSearchParams(newParams);
  };

  return { updateQuery, searchParams };
};

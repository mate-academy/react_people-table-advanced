import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../../utils/searchHelper';

export const useSearchParamsUpdater = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (paramsToUpdate: SearchParams) => {
    const newParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newParams);
  };

  return { searchParams, updateParams };
};

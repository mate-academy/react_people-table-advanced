import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../utils/searchHelper';

export const useSortParams = (paramName: string): SearchParams => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  switch (true) {
    case sortBy === paramName && !!sortOrder:
      return {
        sort: null,
        order: null,
      };

    case sortBy !== paramName:
      return {
        sort: paramName,
      };

    case sortBy === paramName:
      return {
        order: 'desc',
      };

    default:
      return {
        sort: null,
        order: null,
      };
  }
};

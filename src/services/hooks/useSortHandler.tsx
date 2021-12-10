import { useHistory, useLocation } from 'react-router-dom';

import { SortByOptions, SortType } from '../types';

export const useSortHandler = () => {
  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const handleSortChange = (columnName: SortByOptions) => {
    if (columnName !== sortBy) {
      searchParams.set('sortBy', columnName);
      searchParams.set('sortOrder', SortType.Asc);
      history.push({
        search: searchParams.toString(),
      });

      return;
    }

    searchParams.set(
      'sortOrder',
      sortOrder === SortType.Asc
        ? SortType.Desc
        : SortType.Asc,
    );

    history.push({
      search: searchParams.toString(),
    });
  };

  return handleSortChange;
};

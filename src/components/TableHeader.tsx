import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import type { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const SORT_FIELDS = ['Name', 'Sex', 'Born', 'Died'];

export const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getParamsForSorting = (sortBy: string) : SearchParams => {
    if (currentSort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!currentOrder) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (sortBy: string): string => {
    return cn('fas', {
      'fa-sort': currentSort !== sortBy,
      'fa-sort-up': currentSort === sortBy && !currentOrder,
      'fa-sort-down': currentSort === sortBy && currentOrder,
    });
  };

  return (
    <thead>
      <tr>
        {SORT_FIELDS.map(sortField => (
          <th key={sortField}>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortField}
              <SearchLink params={getParamsForSorting(sortField.toLowerCase())}>
                <span className="icon">
                  <i className={getSortIconClass(sortField.toLowerCase())} />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};

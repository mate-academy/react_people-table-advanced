import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../../PeopleFilters/SearchLink';
import { SearchParams } from '../../../utils/searchHelper';

const SORTFIELDS = ['Name', 'Sex', 'Born', 'Died'];

export const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getIconClass = (sortBy: string): string => {
    return classNames('fas', {
      'fa-sort': currentSort !== sortBy,
      'fa-sort-up': currentSort === sortBy && !currentOrder,
      'fa-sort-down': currentSort === sortBy && currentOrder,
    });
  };

  const getParamsForSorting = (sortBy: string): SearchParams => {
    if (currentSort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!currentOrder) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <thead>
      <tr>
        {SORTFIELDS.map(sortField => (
          <th key={sortField}>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortField}
              <SearchLink params={getParamsForSorting(sortField.toLowerCase())}>
                <span className="icon">
                  <i className={getIconClass(sortField.toLowerCase())} />
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

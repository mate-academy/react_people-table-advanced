import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { OrderByType, SortBy } from '../../types/OrderAndSortTypes';
import { sortByValues } from '../../utils/constants';

export const PeopleTableHead: FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const changeSortAndOrder = (sortBy: SortBy, orderBy: OrderByType) => {
    const lowercaseSort = sortBy.toLowerCase();
    const EMPTY = '';
    const ASCENDING = 'asc';
    const DESCENDING = 'desc';

    switch (orderBy) {
      case EMPTY:
        return {
          sort: lowercaseSort || null,
          order: ASCENDING,
        };

      case ASCENDING:
        return {
          sort: lowercaseSort || null,
          order: sort === lowercaseSort ? DESCENDING : ASCENDING,
        };

      case DESCENDING:
        return {
          sort: sort === lowercaseSort ? EMPTY || null : lowercaseSort,
          order: sort === lowercaseSort ? EMPTY || null : ASCENDING,
        };

      default:
        throw new Error(`Wrong order, cannot be defined - ${orderBy}`);
    }
  };

  return (
    <thead>
      <tr>
        {sortByValues.map(value => {
          const lowercaseValue = value.toLowerCase();

          const iconClasses = classNames('fas fa-sort', {
            'fa-sort-up': order === 'asc' && lowercaseValue === sort,
            'fa-sort-down': order === 'desc' && lowercaseValue === sort,
          });

          return (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value}
                <SearchLink
                  params={changeSortAndOrder(
                    value as SortBy,
                    order as OrderByType,
                  )}
                >
                  <span className="icon">
                    <i
                      className={iconClasses}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};

import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { OrderByType, SortBy } from '../../types/OrderAndSortTypes';

const sortByValues = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTableHead: FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const changeSortAndOrder = (sortByV: SortBy, orderByV: OrderByType) => {
    const lowercaseSort = sortByV.toLowerCase();

    switch (orderByV) {
      case '':
        return {
          sort: lowercaseSort || null,
          order: 'asc',
        };

      case 'asc':
        return {
          sort: lowercaseSort || null,
          order: sort === lowercaseSort ? 'desc' : 'asc',
        };

      case 'desc':
        return {
          sort: sort === lowercaseSort ? '' || null : lowercaseSort,
          order: sort === lowercaseSort ? '' || null : 'asc',
        };

      default:
        throw new Error(`Wrong order, cannot be defined - ${orderByV}`);
    }
  };

  return (
    <thead>
      <tr>
        {sortByValues.map(value => {
          const lowercaseValue = value.toLowerCase();

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
                      className={cn('fas fa-sort', {
                        'fa-sort-up': order === 'asc'
                          && lowercaseValue === sort,
                        'fa-sort-down': order === 'desc'
                          && lowercaseValue === sort,
                      })}
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

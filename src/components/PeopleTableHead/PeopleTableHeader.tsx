import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';

const TABLE_SORTING_HEADERS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTableHead = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = !!searchParams.get('order');

  return (
    <thead>
      <tr>
        {TABLE_SORTING_HEADERS.map(header => {
          const lowerHeader = header.toLocaleLowerCase();

          const sortParams = {
            sort: lowerHeader === sort && isReversed ? null : sort,
            order: lowerHeader === sort && !isReversed ? 'desc' : null,
          };

          return (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}

                <SearchLink params={sortParams}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort === lowerHeader,
                        'fa-sort-up': sort === lowerHeader && !isReversed,
                        'fa-sort-down': sort === lowerHeader && isReversed,
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

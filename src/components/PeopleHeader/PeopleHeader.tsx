import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { TABLE_HEADING } from '../../constants';

export const PeopleHeader = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = !!searchParams.get('order');

  return (
    <thead>
      <tr>
        {TABLE_HEADING.map(header => {
          const lowerHeader = header.toLocaleLowerCase();
          const isSortedAsc = lowerHeader === sort && !isReversed;
          const isSortedDesc = lowerHeader === sort && isReversed;

          const sortParams = {
            sort: isSortedDesc ? null : lowerHeader,
            order: isSortedAsc ? 'desc' : null,
          };

          return (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}

                <SearchLink params={sortParams}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== lowerHeader,
                        'fa-sort-up': isSortedAsc,
                        'fa-sort-down': isSortedDesc,
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

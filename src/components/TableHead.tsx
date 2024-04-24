import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { DESC, SORT_HEADERS } from '../utils/constants';
import { capitalizeFirstLetter } from '../utils/functionHelpers';

export const TableHead = () => {
  const [search] = useSearchParams();
  const sort = search.get('sort');
  const order = search.get('order');

  return (
    <thead>
      <tr>
        {SORT_HEADERS.map(header => (
          <th key={header}>
            <span className="is-flex is-flex-wrap-nowrap">
              {capitalizeFirstLetter(header)}
              <SearchLink
                params={{
                  sort: sort === header && order === DESC ? null : header,
                  order: sort === header && !order ? DESC : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== header,
                      'fa-sort-up': sort === header && !order,
                      'fa-sort-down': sort === header && order === DESC,
                    })}
                  />
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

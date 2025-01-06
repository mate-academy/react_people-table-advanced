import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SortFields } from '../types/SortFields';
import classNames from 'classnames';

export const TableHead: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') as SortFields | null;
  const sortOrder = searchParams.get('order') || null;

  const setSortParams = (key: SortFields): Record<string, string | null> => {
    if (sortField === key && !sortOrder) {
      return { order: 'desc' };
    }

    if (sortField === key && sortOrder === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: key, order: null };
  };

  return (
    <thead>
      <tr>
        {Object.entries(SortFields).map(([key, value]) => {
          return (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={setSortParams(value)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sortField !== value,
                        'fa-sort-down':
                          sortField === value && sortOrder === 'desc',
                        'fa-sort-up': sortField === value && !sortOrder,
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

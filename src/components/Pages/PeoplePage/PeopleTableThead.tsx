import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const columns = ['name', 'sex', 'born', 'died'];

export const PeopleTableThead = () => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sortBy = searchParams.get('sort') || null;

  function getSortParams(
    currentSort: string | null,
    currentOrder: string | null,
    column: string,
  ) {
    if (currentSort !== column) {
      return { sort: column, order: null };
    }

    if (!currentOrder) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column}>
            <span className="is-flex is-flex-wrap-nowrap">
              {column[0].toUpperCase() + column.slice(1)}
              <SearchLink params={getSortParams(sortBy, order, column)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sortBy === column && !order,
                      'fa-sort-down': sortBy === column && order === 'desc',
                      'fa-sort': sortBy !== column,
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

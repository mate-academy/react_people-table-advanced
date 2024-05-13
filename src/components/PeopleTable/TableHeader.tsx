import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ParamsNames, SORT_COLUMNS, SortOrder } from '../../constants';
import { SearchLink } from '../Filtering/SearchLink';

const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(ParamsNames.SORT) || '';
  const order = searchParams.get(ParamsNames.ORDER) || '';

  return (
    <thead>
      <tr>
        {SORT_COLUMNS.map(column => {
          const newOrder =
            order !== SortOrder.DESC || sort !== column ? column : null;
          const newSort = !order && sort === column ? SortOrder.DESC : null;
          const columnName = `${column[0].toUpperCase()}${column.slice(1)}`;

          return (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName}
                <SearchLink
                  params={{
                    sort: newOrder,
                    order: newSort,
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': column !== sort,
                        'fa-sort-up': column === sort && !order,
                        'fa-sort-down':
                          column === sort && order === SortOrder.DESC,
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

export default TableHeader;

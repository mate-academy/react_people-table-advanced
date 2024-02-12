import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { TableItem } from '../../types/TableItem';

export const TableHeadItem = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const tableItems = [
    TableItem.Name,
    TableItem.Sex,
    TableItem.Born,
    TableItem.Died,
  ];

  return (
    <thead>
      <tr>
        {tableItems.map(tableItem => {
          const normalizedTableItem = tableItem.toLowerCase();

          return (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {tableItem}
                <SearchLink
                  params={{
                    sort: sort === normalizedTableItem
                      && order ? null : normalizedTableItem,
                    order: sort === normalizedTableItem && !order
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== normalizedTableItem,
                      'fa-sort-up': sort === normalizedTableItem && !order,
                      'fa-sort-down': sort === normalizedTableItem && order,
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

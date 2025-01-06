import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

interface TableColumnProps {
  columnName: string;
}

export function TableColumn({ columnName }: TableColumnProps) {
  const [searchParams] = useSearchParams();

  const columnSortType = columnName.toLowerCase();

  const currentSortField = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortParams = (currentField: string) => {
    if (currentSortField !== currentField) {
      return { sort: currentField, order: null };
    }

    if (currentOrder === null) {
      return { sort: currentField, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink params={getSortParams(columnSortType)}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort-up':
                  currentSortField === columnSortType && currentOrder === null,
                'fa-sort-down':
                  currentSortField === columnSortType &&
                  currentOrder === 'desc',
                'fa-sort': currentSortField !== columnSortType,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
}

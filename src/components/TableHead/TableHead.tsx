import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { ColumnHeaders } from '../../types/ColumnHeaders';

export const TableHead = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleAddSort = (columnHeader: string): SearchParams => {
    switch (sort === columnHeader) {
      case true: {
        if (order) {
          return { order: null, sort: null };
        }

        return { order: 'desc' };
      }

      case false:
      default: {
        return { order: null, sort: columnHeader };
      }
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(ColumnHeaders).map(columnHeader => {
          if (columnHeader !== ColumnHeaders.Mother
              && columnHeader !== ColumnHeaders.Father) {
            const normalizedColumnHeader = columnHeader.toLowerCase();
            const isSortActive = sort === normalizedColumnHeader;

            return (
              <th key={columnHeader}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnHeader}
                  <SearchLink params={handleAddSort(normalizedColumnHeader)}>
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': !isSortActive,
                          'fa-sort-up': isSortActive && !order,
                          'fa-sort-down': isSortActive && order,
                        },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          }

          return <th key={columnHeader}>{columnHeader}</th>;
        })}
      </tr>
    </thead>
  );
};

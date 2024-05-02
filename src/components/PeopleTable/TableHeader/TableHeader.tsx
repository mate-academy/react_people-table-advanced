import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';
import classNames from 'classnames';

type Props = {
  column: string;
};

export const TableHeader: React.FC<Props> = ({ column }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const isParentColumn = (colum: string) =>
    colum === 'Mother' || colum === 'Father';

  const handleSort = (colum: string) => {
    const title = colum.toLowerCase();

    if (!sort) {
      return { sort: title, order: null };
    } else if (sort && !order) {
      return { sort: title, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <th key={column}>
      {isParentColumn(column) ? (
        column
      ) : (
        <span className="is-flex is-flex-wrap-nowrap">
          {column}
          <SearchLink params={handleSort(column)}>
            <span className="icon">
              <i
                className={classNames('fas', {
                  'fa-sort': sort !== column.toLowerCase(),
                  'fa-sort-up': sort === column.toLowerCase() && !order,
                  'fa-sort-down': sort === column.toLowerCase() && order,
                })}
              />
            </span>
          </SearchLink>
        </span>
      )}
    </th>
  );
};

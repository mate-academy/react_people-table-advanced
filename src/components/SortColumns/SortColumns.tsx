import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

type SortParams = {
  [key: string]: string | null;
};

type Props = {
  column: string;
};

export const SortColumns: React.FC<Props> = ({ column }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';

  const createSortParams = (field: string): SortParams => {
    const firstClick = sortParam !== field;
    const secondClick = sortParam === field && !orderParam;
    const thirdClick = sortParam === field && orderParam;

    if (firstClick) {
      return { sort: field, order: null };
    }

    if (secondClick) {
      return { order: 'desc' };
    }

    if (thirdClick) {
      return { sort: null, order: null };
    }

    return {};
  };

  const loverCasedColumn = column.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {column}
        <SearchLink params={createSortParams(loverCasedColumn)}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sortParam !== loverCasedColumn,
                'fa-sort-up': sortParam === loverCasedColumn && !orderParam,
                'fa-sort-down': sortParam === loverCasedColumn && orderParam,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

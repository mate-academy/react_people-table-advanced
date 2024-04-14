import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  column: string;
};

type SortParams = {
  [key: string]: string | null;
};

export const SortColumns: React.FC<Props> = ({ column }) => {
  const normalizedColumn = column.toLowerCase();
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

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {column}
        <SearchLink params={createSortParams(normalizedColumn)}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sortParam !== normalizedColumn,
                'fa-sort-down': sortParam === normalizedColumn && orderParam,
                'fa-sort-up': sortParam === normalizedColumn && !orderParam,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  sortKey: string;
}

export const SortLink: React.FC<Props> = ({ sortKey }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isCurrentSort = sort === sortKey;
  const newOrder = isCurrentSort && !order ? 'desc' : null;

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, {
          sort: sortKey === sort && order === 'desc' ? null : sortKey,
          order: isCurrentSort ? newOrder : null,
        }),
      }}
    >
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': !isCurrentSort,
            'fa-sort-up': isCurrentSort && !order,
            'fa-sort-down': isCurrentSort && order === 'desc',
          })}
        />
      </span>
    </Link>
  );
};

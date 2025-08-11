import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from './searchHelper';
import classNames from 'classnames';

export type SortParams = {
  sortBy: string;
};

export const SortLink: React.FC<SortParams> = ({ sortBy }: SortParams) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  let newSort = sortBy;
  let newOrder = '';

  if (currentSort === sortBy) {
    if (!currentOrder) {
      newOrder = 'desc';
    } else if (currentOrder === 'desc') {
      newSort = '';
      newOrder = '';
    }
  }

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, {
          sort: newSort || null,
          order: newOrder || null,
        }),
      }}
    >
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': currentSort !== sortBy,
            'fa-sort-up': currentSort === sortBy && !currentOrder,
            'fa-sort-down': currentSort === sortBy && currentOrder === 'desc',
          })}
        />
      </span>
    </Link>
  );
};

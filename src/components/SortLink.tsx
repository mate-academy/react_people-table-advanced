import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
  children: React.ReactNode;
};

export const SortLink: React.FC<Props> = ({ field, children }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  let newOrder = 'asc';
  let newSort: string | null = field;

  if (sort === field) {
    if (order === 'asc') {
      newOrder = 'desc';
    } else {
      newSort = null;
    }
  }

  const params = {
    sort: newSort,
    order: newSort && newOrder === 'desc' ? 'desc' : null,
  };

  return (
    <SearchLink params={params} className="is-flex is-flex-wrap-nowrap">
      {children}
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sort !== field,
            'fa-sort-up': sort === field && order === 'asc',
            'fa-sort-down': sort === field && order === 'desc',
          })}
        />
      </span>
    </SearchLink>
  );
};

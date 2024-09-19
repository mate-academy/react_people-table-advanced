import { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  param: string;
  children: ReactNode;
};

export const SortLink: React.FC<Props> = ({ param, children }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  let newOrder = 'asc';

  if (sortBy === param) {
    newOrder = order === 'asc' ? 'desc' : '';
  }

  const newParams = new URLSearchParams(searchParams);

  newParams.set('sort', param);
  if (newOrder === 'asc') {
    newParams.set('order', 'asc');
  } else if (newOrder === 'desc') {
    newParams.set('order', 'desc');
  } else {
    newParams.delete('sort');
    newParams.delete('order');
  }

  return (
    <Link to={{ search: newParams.toString() }} className="is-clickable">
      {children}
      {sortBy === param && (
        <span className="icon">
          <i className={`fas fa-sort-${order === 'asc' ? 'up' : 'down'}`} />
        </span>
      )}
    </Link>
  );
};

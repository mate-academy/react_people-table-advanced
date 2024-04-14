import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('fieldSort') || '';
  const isOrdered = searchParams.get('order') === 'desc';
  const isSortAsc = sortField === field;

  const params = {
    fieldSort: isSortAsc && isOrdered ? null : field,
    order: isSortAsc && !isOrdered ? 'desc' : null,
  };


  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': !isSortAsc,
            'fa-sort-up': isSortAsc && !isOrdered,
            'fa-sort-down': isSortAsc && isOrdered,
          })}
        />
      </span>
    </SearchLink>
  );
};

import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';

type TProps = {
  field: string;
};

export const SortLink: FC<TProps> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const isSortField = field === sortField;

  const params = {
    sort: isSortField && isReversed ? null : field,
    order: isSortField && !isReversed ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': isSortField && !isReversed,
            'fa-sort-down': isSortField && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};

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

  const params = {
    fieldSort: field === sortField && isOrdered ? null : field,
    order: field === sortField && !isOrdered ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': sortField === field && !isOrdered,
            'fa-sort-down': sortField === field && isOrdered,
          })}
        />
      </span>
    </SearchLink>
  );
};

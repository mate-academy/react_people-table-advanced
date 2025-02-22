import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  field: string;
};

export const SortBy: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const isSortedByField = sortField === field;
  const isSortedByFieldAsc = isSortedByField && !isReversed;
  const isSortedByFieldDesc = isSortedByField && isReversed;

  function getParams() {
    if (!isSortedByField) {
      return { sort: field, order: 'asc' };
    }

    if (isSortedByFieldAsc) {
      return { sort: field, order: 'desc' };
    }

    if (isSortedByFieldDesc) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  }

  return (
    <SearchLink params={getParams()}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': !isSortedByField,
            'fa-sort-up': isSortedByFieldAsc,
            'fa-sort-down': isSortedByFieldDesc,
          })}
        />
      </span>
    </SearchLink>
  );
};

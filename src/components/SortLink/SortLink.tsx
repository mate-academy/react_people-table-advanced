import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from '../SearchLink/SearchLink';

type TProps = {
  field: string;
};

export const SortLink: React.FC<TProps> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const isNotSorted = sort !== field;
  const isSortedAsc = sort === field && !order;
  const isSortedDesc = sort === field && order;

  return (
    <SearchLink
      params={{
        sort: isNotSorted || isSortedAsc
          ? field
          : null,
        order: isSortedAsc
          ? 'desc'
          : null,
      }}
    >
      <span className="icon">
        <i className={classNames(
          'fas',
          {
            'fa-sort': isNotSorted,
            'fa-sort-up': isSortedAsc,
            'fa-sort-down': isSortedDesc,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};

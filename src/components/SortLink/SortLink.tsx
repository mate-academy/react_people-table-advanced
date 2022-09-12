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

  return (
    <SearchLink
      params={{
        sort: sort !== field || (sort === field && !order)
          ? field
          : null,
        order: sort === field && !order
          ? 'desc'
          : null,
      }}
    >
      <span className="icon">
        <i className={classNames(
          'fas',
          {
            'fa-sort': sort !== field,
            'fa-sort-up': sort === field && !order,
            'fa-sort-down': sort === field && order,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};

import { FC } from 'react';
import { LinkProps, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortBy } from '../../types/SortBy';
import { SearchLink } from './SearchLink';

type Props = Omit<LinkProps, 'to'> & {
  sort: SortBy,
};

export const SorterLink: FC<Props> = ({ sort }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentSortOrder = searchParams.get('order') || '';
  

  const newParams = {
    sort: (sort === currentSort && currentSortOrder) ? null : sort,
    order: (sort === currentSort && !currentSortOrder) ? 'desc' : null,
  };


  return (
    <SearchLink
      params={newParams}
    >
      <span className="icon">
        <i className={classNames('fas',
          {
            'fa-sort': sort !== currentSort,
            'fa-sort-up': sort === currentSort && !currentSortOrder,
            'fa-sort-down': sort === currentSort && currentSortOrder,
          })}
        />
      </span>
    </SearchLink>
  );
};

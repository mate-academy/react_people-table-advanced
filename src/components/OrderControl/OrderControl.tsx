import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  sortBy: string
};

export const OrderControl: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();

  const getSearchParams = () => {
    const currentSort = searchParams.get('sort');

    let nextSortOrder = null;

    if (!searchParams.has('order') && currentSort === sortBy) {
      nextSortOrder = 'desc';
    }

    return {
      sort: searchParams.has('order') && currentSort === sortBy ? null : sortBy,
      order: nextSortOrder,
    };
  };

  return (
    <SearchLink params={getSearchParams()}>
      <span className="icon">
        <i className={
          classNames('fas',
            {
              'fa-sort': searchParams.get('sort') !== sortBy,
              'fa-sort-up': searchParams.get('sort') === sortBy
                && !searchParams.has('order'),
              'fa-sort-down': searchParams.get('sort') === sortBy
                && searchParams.has('order'),
            })
        }
        />
      </span>
    </SearchLink>
  );
};

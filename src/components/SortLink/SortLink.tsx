import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { getSearchWith } from '../../utils';

type Props = {
  sort: keyof Person,
};

export const SortLink: React.FC<Props> = ({ sort }) => {
  const [searchParams] = useSearchParams();
  const isCurrentSort = searchParams.get('sort') === sort;
  const isReversed = searchParams.get('order') === 'desc';

  const getSearchWithSort = (sortBy: keyof Person) => {
    if (!isCurrentSort) {
      return getSearchWith(searchParams, {
        sort: sortBy,
        order: null,
      });
    }

    if (!isReversed) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(
      searchParams,
      {
        sort: null,
        order: null,
      },
    );
  };

  return (
    <Link
      to={{
        search: getSearchWithSort(sort),
      }}
    >
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort-down': isCurrentSort,
              'fa-sort-up': isCurrentSort && isReversed,
              'fa-sort': !isCurrentSort,
            },
          )}
        />
      </span>
    </Link>
  );
};

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../../SearchLink';
import { SortType } from '../../../types/SortType';
import {
  orderDescValue,
  orderParam,
  sortParam,
} from '../../../common/constants';

type Props = {
  sortOption: SortType;
};

export const SortLink: React.FC<Props> = ({ sortOption }) => {
  const [searchParams] = useSearchParams();

  const prevSortOption = searchParams.get(sortParam);
  const prevSortOrder = searchParams.get(orderParam);

  const isSorted = prevSortOption === sortOption;
  const isReversed = prevSortOrder === orderDescValue;

  const sort = isSorted && isReversed
    ? null
    : sortOption;

  const order = isSorted && !isReversed
    ? orderDescValue
    : null;

  const newSearchParams = {
    [sortParam]: sort,
    [orderParam]: order,
  };

  return (
    <SearchLink params={newSearchParams}>
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort': !isSorted,
              'fa-sort-up': isSorted && !isReversed,
              'fa-sort-down': isSorted && isReversed,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};

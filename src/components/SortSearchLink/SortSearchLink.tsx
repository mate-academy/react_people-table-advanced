/* eslint-disable no-console */
import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParamsObject } from '../../utils/getParamsObject';
import { SearchLink } from '../SearchLink';

type Props = {
  text: string;
};

export const SortSearchLink: React.FC<Props> = React.memo(({ text }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || null;
  const sortBy = text.toLowerCase();

  const paramsObject = getParamsObject(currentSort, currentOrder, sortBy);
  const isSelectedSort = currentSort === sortBy;

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {text}
        <SearchLink params={paramsObject}>
          <span className="icon">
            <i
              className={cn(
                'fas',
                { 'fa-sort': !isSelectedSort },
                { 'fa-sort-up': isSelectedSort && !currentOrder },
                { 'fa-sort-down': isSelectedSort },
              )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
});

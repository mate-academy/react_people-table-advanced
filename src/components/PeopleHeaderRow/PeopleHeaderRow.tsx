import React from 'react';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams } from '../../utils/searchHelper';

interface Props {
  headerTitle: string;
}

export const PeopleHeaderRow: React.FC<Props> = ({ headerTitle }) => {
  const normalizedHeaderTitle = headerTitle.toLowerCase();
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  let nextParams: SearchParams = { sort: normalizedHeaderTitle, order: null };

  const isSorted = sortField === normalizedHeaderTitle;

  if (isSorted) {
    nextParams = { sort: normalizedHeaderTitle, order: 'desc' };
  }

  if (isSorted && sortOrder) {
    nextParams = { sort: null, order: null };
  }

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {headerTitle}
        <SearchLink params={nextParams}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': !isSorted,
                'fa-sort-up': isSorted && !sortOrder,
                'fa-sort-down': isSorted && sortOrder,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

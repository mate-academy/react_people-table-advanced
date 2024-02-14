import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PeopleContext } from '../Context';

export const SortLink: React.FC<{ field: string }> = ({ field }) => {
  const { filters, handleChangeFilter } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();
  const isReversed = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('sort') || '';

  useEffect(() => {
    handleChangeFilter('sortField', sortField);
    handleChangeFilter('isReversed', isReversed);
  }, [sortField, isReversed, handleChangeFilter]);

  const params = {
    sort: (field === filters.sortField && filters.isReversed) ? null : field,
    order: (field === filters.sortField && !filters.isReversed) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': filters.sortField !== field,
            'fa-sort-up': filters.sortField === field && !filters.isReversed,
            'fa-sort-down': filters.sortField === field && filters.isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};

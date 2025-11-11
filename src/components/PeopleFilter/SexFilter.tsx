import React from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

interface SexFilterProps {
  searchParams: URLSearchParams;
}

export const SexFilter: React.FC<SexFilterProps> = ({ searchParams }) => {
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={sex ? '' : 'is-active'}
        to={{
          search: getSearchWith(searchParams, { sex: null }),
        }}
        replace
      >
        All
      </Link>
      <Link
        className={sex === 'm' ? 'is-active' : ''}
        to={{
          search: getSearchWith(searchParams, { sex: 'm' }),
        }}
        replace
      >
        Male
      </Link>
      <Link
        className={sex === 'f' ? 'is-active' : ''}
        to={{
          search: getSearchWith(searchParams, { sex: 'f' }),
        }}
        replace
      >
        Female
      </Link>
    </p>
  );
};

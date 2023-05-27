import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        field={{ sex: null }}
        className={classNames({ 'is-active': !sex })}
      >
        All
      </SearchLink>
      <SearchLink
        field={{ sex: 'm' }}
        className={classNames({ 'is-active': sex === 'm' })}
      >
        Male
      </SearchLink>
      <SearchLink
        field={{ sex: 'f' }}
        className={classNames({ 'is-active': sex === 'f' })}
      >
        Female
      </SearchLink>
    </p>
  );
};

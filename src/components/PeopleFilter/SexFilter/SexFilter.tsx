import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../../SearchLink';
import { sexFilter, sexParam } from '../../../common/constants';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(sexParam);

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexFilter.map(({ value, text }) => (
        <SearchLink
          key={value}
          params={{ [sexParam]: value }}
          className={classNames(
            {
              'is-active': sex === value,
            },
          )}
        >
          {text}
        </SearchLink>
      ))}
    </p>
  );
};

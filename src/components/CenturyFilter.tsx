import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => (
          <SearchLink
            data-cy="century"
            key={century}
            className={cn('button mr-1', {
              'is-info': centuries.includes(century),
            })}
            params={{
              centuries: centuries.includes(century)
                ? centuries.filter(cc => century !== cc)
                : [...centuries, century],
            }}
          >
            {century}
          </SearchLink>
        ))}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={cn('button', 'is-success', {
            'is-outlined': centuries.length,
          })}
          params={{ centuries: null }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};

import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const CenturyFilter:React.FC = () => {
  const availableCenturies = ['16', '17', '18', '19', '20'];
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (

    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {availableCenturies.map(century => (
            <SearchLink
              data-cy="century"
              key={century}
              className={cn('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(c => c !== century)
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
            className={cn('button is-success', {
              'is-outlined': centuries.length > 0,
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

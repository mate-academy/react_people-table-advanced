import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const toggleCenturies = (century: string) => (
    centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century]
  );

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              params={{ centuries: toggleCenturies(century.toString()) }}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(century.toString()),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': !!centuries.length,
            })}
          >
            All
          </SearchLink>

        </div>
      </div>
    </div>
  );
};

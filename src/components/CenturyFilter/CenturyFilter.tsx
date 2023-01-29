import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const CenturyFilter: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const century = searchParams.getAll('century') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map(currentCentury => (
            <SearchLink
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': century.includes(currentCentury) },
              )}
              params={{
                century: century.includes(currentCentury)
                  ? century.filter(curr => curr !== currentCentury)
                  : [...century, currentCentury],
              }}
              key={currentCentury}
            >
              {currentCentury}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={cn(
              'button is-success',
              { 'is-outlined': century.length !== 0 },
            )}
            params={{ century: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
});

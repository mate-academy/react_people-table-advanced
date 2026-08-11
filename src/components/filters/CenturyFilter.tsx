import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const toggleCentury = (century: string) =>
    centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

  return (
    <div className="panel-block">
      <div
        className="level left is-flex-grow-1 is-mobile"
        data-cy="CenturyFilter"
      >
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{ centuries: toggleCentury(century) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': centuries.length > 0,
            })}
            params={{ centuries: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

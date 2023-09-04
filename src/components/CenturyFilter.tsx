import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const filteringCenturies = ['16', '17', '18', '19', '20'];

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {filteringCenturies.map(century => (
            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes(century) },
              )}
              field={{
                centuries: centuries.includes(century)
                  ? centuries.filter(c => c !== century)
                  : [...centuries, century],
              }}
              key={century}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            field={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

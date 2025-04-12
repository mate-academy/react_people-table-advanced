import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';
import classNames from 'classnames';
import React from 'react';

const centuriesArray = ['16', '17', '18', '19', '20'];

export const FilterByCenturies = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesArray.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(num => century !== num)
                  : [...centuries, century],
              }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes(century),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            params={{
              centuries: null,
            }}
            className={classNames('button is-success', {
              'is-outlined': centuries.length > 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

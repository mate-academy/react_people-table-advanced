import React from 'react';
import classNames from 'classnames';
import { CENTURIES_LINK, Filter } from '../../types/Filter';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getArraySearchParams } from '../PeopleFilters';

export const CenturiesFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const centuries =
    (searchParams.getAll('centuries') as Filter['centuries']) || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES_LINK.map(cent => (
            <SearchLink
              key={cent}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(cent),
              })}
              params={{
                centuries: getArraySearchParams(centuries, cent),
              }}
            >
              {cent}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button', 'is-success', {
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

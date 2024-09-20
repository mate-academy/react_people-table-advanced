import classNames from 'classnames';
import { FilterCenturies } from '../../constants/FilterCenturies';
import { SearchLink } from '../SearchLink';
import React from 'react';

interface Props {
  selectedCenturies: string[];
  getCenturyParams: (century: string) => string | string[] | null;
}

export const CenturyFilter: React.FC<Props> = ({
  selectedCenturies,
  getCenturyParams,
}) => {
  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {Object.values(FilterCenturies).map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes(century),
              })}
              params={{
                centuries: getCenturyParams(century),
              }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': !!selectedCenturies.length,
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

import React from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getCenturies } from './centuryFilterHelpers';

const centuriesValues = getCenturies(16, 20);

interface Props {
  centuries: string[];
}

export const PeopleCenturyFilter: React.FC<Props> = React.memo(
  ({ centuries }) => {
    return (
      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuriesValues.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(current => current !== century)
                    : [...centuries, century],
                }}
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
    );
  },
);

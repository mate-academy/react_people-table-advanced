import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../../SearchLink';
import { centuriesParam, centuryFilter } from '../../../common/constants';
import { toggleCentury } from '../../../common/helpers';

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll(centuriesParam);

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuryFilter.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                {
                  'is-info': centuries.includes(century),
                },
              )}
              params={{ [centuriesParam]: toggleCentury(centuries, century) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames(
              'button',
              'is-success',
              {
                'is-outlined': centuries.length > 0,
              },
            )}
            params={{ [centuriesParam]: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

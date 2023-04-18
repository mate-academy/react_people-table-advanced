import classNames from 'classnames';
import { FC } from 'react';
import { SearchLink } from '../../SearchLink';

export type Props = {
  centuries: string[],
};

export const CenturiesFilter: FC<Props> = ({ centuries }) => {
  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {['16', '17', '18', '19', '20'].map((century) => (
          <SearchLink
            key={century}
            data-cy="century"
            className={classNames(
              'button mr-1',
              { 'is-info': centuries.includes(century) },
            )}
            params={{
              centuries: centuries.includes(century)
                ? centuries.filter((prevCentury) => prevCentury !== century)
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
          className={classNames(
            'button',
            'is-success',
            { 'is-outlined': centuries.length > 0 },
          )}
          params={{ centuries: [] }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};

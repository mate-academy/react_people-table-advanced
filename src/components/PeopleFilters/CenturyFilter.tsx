import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const selectCenturies = searchParams.getAll('centuries') || [];

  const upgreatCenturies = (century: string): string[] => {
    return selectCenturies.includes(century)
      ? selectCenturies.filter(selectCentury => selectCentury !== century)
      : [...selectCenturies, century];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': selectCenturies.includes(century) },
              )}
              params={{ centuries: upgreatCenturies(century) }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames(
              'button is-success',
              { 'is-outlined': selectCenturies.length === 0 },
            )}
            params={{ centuries: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

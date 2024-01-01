import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll('centuries') || [];

  const getUpdatedCenturies = (century: string): string[] => {
    return activeCenturies.includes(century)
      ? activeCenturies.filter(
        activeCentury => activeCentury !== century,
      )
      : [...activeCenturies, century];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              params={{ centuries: getUpdatedCenturies(century) }}
              key={century}
              data-cy="century"
              className={cn(
                'button mr-1', { 'is-info': activeCenturies.includes(century) },
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
              'button is-success', { 'is-outlined': activeCenturies.length },
            )}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

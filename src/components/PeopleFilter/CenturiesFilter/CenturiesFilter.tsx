import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuriesParams = searchParams.getAll('centuries') || [];

  const handleCenturiesParams = (century: string) => {
    if (centuriesParams.includes(century)) {
      return centuriesParams.filter(
        currentCentury => currentCentury !== century,
      );
    } else {
      return [...centuriesParams, century];
    }
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              params={{ centuries: handleCenturiesParams(century) }}
              className={cn('button mr-1', {
                'is-info': centuriesParams.includes(century),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            params={{ centuries: [] }}
            className={cn('button is-success', {
              'is-outlined': !!centuriesParams.length,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

export default CenturyFilter;

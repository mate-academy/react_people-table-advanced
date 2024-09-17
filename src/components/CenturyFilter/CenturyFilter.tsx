import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuryParams = searchParams.getAll('centuries') || [];

  const toggleCentury = (century: string) => {
    if (centuryParams.includes(century)) {
      return centuryParams.filter(centuryParam => centuryParam !== century);
    } else {
      return [...centuryParams, century];
    }
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              params={{ centuries: toggleCentury(century) }}
              className={classNames('button mr-1', {
                'is-info': centuryParams.includes(century),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': !!centuryParams.length,
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

const CENTURIES_VALUES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuryValues = searchParams.getAll('centuries') || [];

  const handleChangeCentury = (century: string) => {
    return centuryValues.includes(century)
      ? centuryValues.filter(value => value !== century)
      : [...centuryValues, century];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES_VALUES.map(century => (
            <SearchLink
              key={century}
              params={{ centuries: handleChangeCentury(century) }}
              className={classNames('button mr-1', {
                'is-info': centuryValues.includes(century),
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
              'is-outlined': !!centuryValues.length,
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

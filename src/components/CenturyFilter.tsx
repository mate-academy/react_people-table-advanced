import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { CENTURIES } from '../utils/constants';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function getUpdatedParams(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    return {
      centuries: newCenturies.length ? newCenturies : null,
    };
  }

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={getUpdatedParams(century)}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import { SearchLink } from './SearchLink';

const CURRENT_CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function toggleCentury(num: string) {
    const newCentury = centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];

    return newCentury;
  }

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CURRENT_CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classnames('button mr-1', {
                'is-info' : centuries.includes(century),
              })}
              params={{
                centuries: toggleCentury(century),
              }}
            >
              {century}
            </SearchLink>
          )) }
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classnames('button is-succes', {
              'is-outlined': !!centuries.length,
            })}
            params={{centuries: null}}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

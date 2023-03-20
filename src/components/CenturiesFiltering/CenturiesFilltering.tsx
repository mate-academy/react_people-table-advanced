import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../SearchLink';

export const CenturiesFilltering = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesArr = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesArr.map((centurie) => (
            <SearchLink
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes(centurie) },
              )}
              params={{
                centuries: centuries.includes(centurie)
                  ? centuries.filter((c) => c !== centurie)
                  : [...centuries, centurie],
              }}
            >
              {centurie}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames(
              'button',
              'is-success',
              { 'is-outlined': centuries.length !== 0 },
            )}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

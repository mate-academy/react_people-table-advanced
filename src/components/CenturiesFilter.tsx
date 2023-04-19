import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map((century) => {
            return (
              <SearchLink
                key={century}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter((c) => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button', 'is-success', {
              'is-outlined': centuries.length,
            })}
            params={{
              centuries: [],
            }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

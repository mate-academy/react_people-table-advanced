import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';

const centuriesValues = ['16', '17', '18', '19', '20'];

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div
        className="level is-flex-grow-1 is-mobile"
        data-cy="CenturyFilter"
      >
        <div className="level-left">
          {centuriesValues.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(value => value !== century)
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
            className={cn('button', 'is-success', {
              'is-outlined': centuries.length > 0,
            })}
            params={{
              centuries: null,
            }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

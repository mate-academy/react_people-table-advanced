import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../Shared/SearchLink';
import cn from 'classnames';

const centuryFilters = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuryFilters.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(c => c !== century)
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
            className={cn('button is-success', {
              'is-outlined': centuries.length > 0,
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

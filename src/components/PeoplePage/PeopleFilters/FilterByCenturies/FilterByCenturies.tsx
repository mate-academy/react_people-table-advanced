import { useSearchParams } from 'react-router-dom';
import { centuriesFilter } from '../utils/FilterParams';
import { SearchLink } from '../../../../SearchLink';
import cn from 'classnames';

export const FilterByCenturies = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const getParams = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesFilter.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              params={{
                centuries: getParams(century),
              }}
              className={cn('button mr-1', {
                'is-info': centuries.includes(century),
              })}
            >
              {century}
            </SearchLink>
          ))}

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
    </div>
  );
};

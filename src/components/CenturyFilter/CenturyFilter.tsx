import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { CENTURIES } from '../../constants';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => (
          <SearchLink
            key={century}
            data-cy="century"
            params={{
              centuries: centuries.includes(century)
                ? centuries.filter(curr => curr !== century)
                : [...centuries, century],
            }}
            className={cn('button mr-1', {
              'is-info': centuries.includes(century),
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
            'is-outlined': !!centuries.length,
          })}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};

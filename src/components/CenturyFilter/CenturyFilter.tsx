import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const getCenturiesParams = (selectedCentury: string) =>
    centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => (
          <SearchLink
            key={century}
            data-cy="century"
            params={{
              centuries: getCenturiesParams(century),
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

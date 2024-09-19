/* eslint-disable */
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => {
            const hasCentury = centuries.includes(century.toString());

            const newCenturies = hasCentury
              ? centuries.filter(
                  currentCentury => currentCentury !== century.toString(),
                )
              : [...centuries, century.toString()];

            return (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': hasCentury,
                })}
                params={{ centuries: newCenturies }}
              >
                {century}
              </SearchLink>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': centuries.length,
            })}
            params={{ centuries: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

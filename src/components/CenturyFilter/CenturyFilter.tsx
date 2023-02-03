import { useSearchParams } from 'react-router-dom';
import { memo } from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

export const CenturyFilter = memo(() => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('century');

  const onCenturyChange = (currentCentury: string) => {
    return {
      century: centuries.includes(currentCentury)
        ? centuries.filter(prevCentury => prevCentury !== currentCentury)
        : [...centuries, currentCentury],
    };
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map(centuryToShow => (
            <SearchLink
              data-cy="century"
              key={+centuryToShow}
              className={cn('button mr-1', {
                'is-info': centuries.includes(centuryToShow),
              })}
              params={onCenturyChange(centuryToShow)}
            >
              {centuryToShow}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': centuries.length > 0,
            })}
            params={{ century: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
});

import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../utils/SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const checkCentury = (century: string) => {
    return centuries.includes(century);
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesList.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn(
                'button',
                'mr-1',
                { 'is-info': checkCentury(century) },
              )}
              params={{
                centuries: checkCentury(century)
                  ? centuries.filter(currCentury => currCentury !== century)
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
            className={cn(
              'button',
              'is-success',
              { 'is-outlined': centuries.length },
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

export default CenturiesFilter;

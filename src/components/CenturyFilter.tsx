import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Century } from '../types/Century';
import { SearchLink } from './SearchLink';

const centuryArray = Object.values(Century).slice(5);

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchCentury = searchParams.getAll('centuries');

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {centuryArray.map(century => {
          const stringCentury = String(century);
          const isActive = searchCentury.includes(stringCentury);

          return (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive,
              })}
              params={searchCentury.includes(stringCentury)
                ? {
                  centuries: searchCentury
                    .filter(item => item !== stringCentury),
                }
                : { centuries: [...searchCentury, stringCentury] }}
            >
              {stringCentury}
            </SearchLink>
          );
        })}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={classNames('button', 'is-success', {
            'is-outlined': searchCentury.length,
          })}
          params={{ centuries: null }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};

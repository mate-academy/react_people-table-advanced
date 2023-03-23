import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const centuriesForFilter = ['16', '17', '18', '19', '20'];

export const FilterCentury = () => {
  const [search] = useSearchParams();
  const activeCenturies = search.getAll('centries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesForFilter.map(centuries => (
            <SearchLink
              data-cy="century"
              className={classNames(
                'button mr-1',
                { 'is-info': activeCenturies.includes(centuries) },
              )}
              params={{
                centries: activeCenturies.includes(centuries)
                  ? activeCenturies.filter(c => c !== centuries)
                  : [...activeCenturies, centuries],
              }}
              replace
            >
              {centuries}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{
              centries: [],
            }}
            replace
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

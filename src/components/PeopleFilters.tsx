import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Filter, FilterSex } from '../types/Filter';
import { getHrefForLink } from './helper';

const CENTURIES_VALUES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const location = useLocation();

  const handleFilterChanging = (
    field: Filter,
    value: string,
  ) => {
    setFilterParams(currentParams => {
      if (!value) {
        currentParams.delete(field);

        return currentParams;
      }

      currentParams.set(field, value);

      return currentParams;
    });
  };

  const handleCenturiesApplying = (value: string) => {
    const centuries = filterParams.getAll('century');

    if (centuries.includes(value)) {
      setFilterParams(currentParams => {
        const currentCentury = currentParams.getAll('century')
          .filter(centuryNumber => centuryNumber !== value);

        currentParams.delete('century');

        currentCentury.forEach(century => {
          currentParams.append('century', century);
        });

        return currentParams;
      });
    } else {
      setFilterParams(currentParams => {
        currentParams.append('century', value);

        return currentParams;
      });
    }
  };

  const handleResetCenturies = () => {
    setFilterParams(currentParams => {
      currentParams.delete('century');

      return currentParams;
    });
  };

  const handleResetAll = () => {
    setFilterParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          href={`#${getHrefForLink(Filter.Sex, FilterSex.All, location)}`}
          className={cn({ 'is-active': !filterParams.get(Filter.Sex) })}
          onClick={() => handleFilterChanging(Filter.Sex, FilterSex.All)}
        >
          All
        </a>

        <a
          href={`#${getHrefForLink(Filter.Sex, FilterSex.Male, location)}`}
          className={cn({
            'is-active': filterParams.get(Filter.Sex) === FilterSex.Male,
          })}
          onClick={() => handleFilterChanging(Filter.Sex, FilterSex.Male)}
        >
          Male
        </a>

        <a
          href={`#${getHrefForLink(Filter.Sex, FilterSex.Female, location)}`}
          className={cn({
            'is-active': filterParams.get(Filter.Sex) === FilterSex.Female,
          })}
          onClick={() => handleFilterChanging(Filter.Sex, FilterSex.Female)}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={filterParams.get('query') || ''}
            onChange={(event) => handleFilterChanging(
              Filter.Query,
              event.target.value,
            )}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_VALUES.map(century => (
              <button
                type="button"
                data-cy="century"
                className={cn(
                  'button mr-1',
                  {
                    'is-info': filterParams.getAll('century').includes(century),
                  },
                )}
                key={century}
                onClick={() => handleCenturiesApplying(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleResetCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleResetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

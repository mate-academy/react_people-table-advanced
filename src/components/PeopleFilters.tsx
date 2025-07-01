import cn from 'classnames';
import { useFilters } from '../hooks/useFilters';
import { SexFilters } from '../types/SexFilters';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const { centuries, activeCentury, activeSex, query, handleQueryChange } =
    useFilters();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilters).map(([key, value]) => {
          return (
            <SearchLink
              key={key}
              className={activeSex === key ? 'is-active' : ''}
              params={{ sex: key === 'all' ? null : key }}
            >
              {value}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              const isActive = activeCentury.includes(century);

              const updatedCenturies = isActive
                ? activeCentury.filter(c => c !== century)
                : [...activeCentury, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': isActive,
                  })}
                  params={{ centuries: updatedCenturies }}
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
                'is-outlined': !!activeCentury.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

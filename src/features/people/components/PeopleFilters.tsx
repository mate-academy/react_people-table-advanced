import { usePeopleFilterParams } from '../hooks/usePeopleFilterParams';
import { centuries, sex } from './filterConfig';
import { SearchLink } from '../../../components/SearchLink';
import cn from 'classnames';

export const PeopleFilters = () => {
  const {
    currentSexFilter,
    currentCenturiesFilter,
    currentQueryFilter,
    setQueryFilter,
  } = usePeopleFilterParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sex.map(({ label, value }) => {
          return (
            <SearchLink
              key={`${label}+${value}`}
              className={`${currentSexFilter === value ? 'is-active' : ''}`}
              params={{ sex: value }}
            >
              {label}
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
            defaultValue={currentQueryFilter || ''}
            onChange={e => setQueryFilter(e.target.value)}
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
              return (
                <SearchLink
                  key={`${century}-century`}
                  data-cy="century"
                  className={`button mr-1 ${currentCenturiesFilter.includes(century) ? 'is-info' : ''}`}
                  params={{
                    centuries: currentCenturiesFilter.includes(century)
                      ? currentCenturiesFilter.filter(c => c !== century)
                      : [...currentCenturiesFilter, century],
                  }}
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
                'is-outlined': currentCenturiesFilter.length > 0,
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
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

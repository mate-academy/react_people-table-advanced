import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { SexFilters, FILTER_CENTURIES } from '../utils/filterHelpers';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilters).map(sexFilter => {
          const sexValue = sexFilter.charAt(0);
          const filterTitle = sexValue.toUpperCase() + sexFilter.slice(1);

          return (
            <SearchLink
              params={{ sex: sexFilter === SexFilters.All ? null : sexValue }}
              key={sexFilter}
              className={cn({
                'is-active':
                  sex === sexValue || (sex === null && sexFilter === SexFilters.All),
              })}
            >
              {filterTitle}
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
            onChange={event => {
              setSearchWith({ query: event.target.value || null });
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {FILTER_CENTURIES.map(century => {
              const currentCenturies = centuries.includes(century)
                ? centuries.filter(current => century !== current)
                : [...centuries, century];

              return (
                <SearchLink
                  params={{
                    centuries: currentCenturies,
                  }}
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, sex: null, centuries: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

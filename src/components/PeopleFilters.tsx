import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      {/* Search by query */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              const next = new URLSearchParams(searchParams);

              e.target.value
                ? next.set('query', e.target.value)
                : next.delete('query');
              window.history.replaceState(null, '', `?${next.toString()}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      {/* Century filter */}
      <div className="panel-block" data-cy="CenturyFilter">
        <div className="level is-flex-grow-1 is-mobile">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(c) ? 'is-info' : ''}`}
                params={{
                  centuries: centuries.includes(c)
                    ? centuries.filter(i => i !== c)
                    : [...centuries, c],
                }}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          {/* "All" button to clear centuries on the right */}
          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={`button is-success ${centuries.length === 0 ? 'is-info' : 'is-light'}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset all filters */}
      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: [],
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

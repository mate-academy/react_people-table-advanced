import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink to="/people" params={{ sex: null }}>
          <a className={!searchParams.get('sex') ? 'is-active' : ''}>All</a>
        </SearchLink>
        <SearchLink to="/people" params={{ sex: 'm' }}>
          <a className={searchParams.get('sex') === 'm' ? 'is-active' : ''}>
            Male
          </a>
        </SearchLink>
        <SearchLink to="/people" params={{ sex: 'f' }}>
          <a className={searchParams.get('sex') === 'f' ? 'is-active' : ''}>
            Female
          </a>
        </SearchLink>
      </p>

      {/* Name Filter */}
      <div className="panel-block">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={e => {
            const val = e.target.value;
            //const params = { query: val || null };
            const url = new URLSearchParams(searchParams.toString());

            if (!val) {
              url.delete('query');
            } else {
              url.set('query', val);
            }

            window.history.replaceState(null, '', `/people?${url.toString()}`);
          }}
        />
      </div>

      {/* Century Filter */}
      <div className="panel-block" data-cy="CenturyFilter">
        {centuries.map(c => (
          <SearchLink
            key={c}
            to="/people"
            params={{
              centuries: selectedCenturies.includes(c)
                ? selectedCenturies.filter(x => x !== c)
                : [...selectedCenturies, c],
            }}
          >
            <button
              className={`button mr-1 ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
            >
              {c}
            </button>
          </SearchLink>
        ))}
        <SearchLink
          to="/people"
          params={{ centuries: null, query: null, sort: null, order: null }}
        >
          <button className="button is-success is-outlined ml-4">All</button>
        </SearchLink>
      </div>

      {/* Reset all filters */}
      <div className="panel-block">
        <SearchLink
          to="/people"
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </SearchLink>
      </div>
    </nav>
  );
};

import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') ?? '';
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string): void => {
    const current = searchParams.getAll('centuries');

    const updated = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    const newSearch = getSearchWith(searchParams, {
      centuries: updated.length > 0 ? updated : null,
    });

    setSearchParams(newSearch);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>All</SearchLink>
        <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
        <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
      </p>

      {/* Name Filter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam}
            onChange={e => {
              const value = e.target.value;

              const newSearch = getSearchWith(searchParams, {
                query: value.trim() ? value : null,
              });

              setSearchParams(newSearch);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* Century Filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${
                  selectedCenturies.includes(c) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newSearch = getSearchWith(searchParams, {
                  centuries: null,
                });

                setSearchParams(newSearch);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Reset All */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            centuries: null,
            sex: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

interface PeopleFiltersProps {
  query: string;
  setQuery: (v: string) => void;
  centuries: string[];
  toggleCentury: (v: string) => void;
  setSex: (v: string | null) => void;
  resetFilters: () => void;
  sex: string | null;
}

export const PeopleFilters = ({
  query,
  setQuery,
  centuries,
  toggleCentury,
  setSex,
  resetFilters,
  sex,
}: PeopleFiltersProps) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          className={sex === null ? 'is-active' : ''}
          onClick={() => setSex(null)}
        >
          All
        </button>
        <button
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => setSex('m')}
        >
          Male
        </button>
        <button
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => setSex('f')}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(c) ? 'is-info' : ''}`}
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
              onClick={resetFilters}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

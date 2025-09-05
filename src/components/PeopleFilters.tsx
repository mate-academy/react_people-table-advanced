import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = new Set(
    searchParams.getAll('centuries').map(Number)
  );
  const sex = searchParams.get('sex') || 'all';

  const toggleCentury = (c: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const selected = new Set(newParams.getAll('centuries').map(Number));
    if (selected.has(c)) selected.delete(c);
    else selected.add(c);

    newParams.delete('centuries');
    selected.forEach(v => newParams.append('centuries', v.toString()));
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: 'all' }}
          className={sex === 'all' ? 'is-active' : ''}
        >
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

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              const newParams = new URLSearchParams(searchParams.toString());
              const value = e.target.value;
              if (value) newParams.set('query', value);
              else newParams.delete('query');
              setSearchParams(newParams);
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
            {[16, 17, 18, 19, 20].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.has(c) ? 'is-info' : ''}`}
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
              onClick={resetAllFilters}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

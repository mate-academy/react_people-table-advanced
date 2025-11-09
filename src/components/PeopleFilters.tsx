import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleCenturyClick = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies = newParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      // Remove this century
      newParams.delete('centuries');
      currentCenturies
        .filter(c => c !== century)
        .forEach(c => newParams.append('centuries', c));
    } else {
      // Add this century
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetCenturiesFilter = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

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
            {['16', '17', '18', '19', '20'].map(century => (
              <button
                key={century}
                data-cy="century"
                type="button"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyClick(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              type="button"
              className="button is-success is-outlined"
              onClick={resetCenturiesFilter}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

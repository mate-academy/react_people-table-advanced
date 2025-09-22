import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries').map(Number) || [];
  const sex = searchParams.get('sex') || 'All';

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSearchParams(
      getSearchWith(searchParams, { query: value ? value : null }),
    );
  }

  function toggleCentury(n: number) {
    const newCenturies = centuries.includes(n)
      ? centuries.filter(c => c !== n)
      : [...centuries, n];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies.map(String) : null,
      }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sex === 'All' ? 'is-active' : ''}
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
            {[16, 17, 18, 19, 20].map(n => (
              <button
                key={n}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(n) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className="button is-success is-outlined"
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams('')}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

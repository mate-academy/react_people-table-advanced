import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const newCenturies = [...selectedCenturies];
    const index = newCenturies.indexOf(century);

    if (index >= 0) {
      newCenturies.splice(index, 1);
    } else {
      newCenturies.push(century);
    }

    const newSearch = getSearchWith(searchParams, {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    });

    setSearchParams(newSearch);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    const newSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(newSearch);
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!searchParams.get('sex') ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      {/* Name Filter */}
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

      {/* Century Filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(century)}
              >
                {century}
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

      {/* Reset Button */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
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

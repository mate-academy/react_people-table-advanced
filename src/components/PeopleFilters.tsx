import { useSearchParams, Link } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getActiveClass = (key: string, value: string | null) => {
    const paramValue = searchParams.get(key);
    return paramValue === value || (!paramValue && value === null)
      ? 'is-active'
      : '';
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue) {
      searchParams.set('query', searchValue);
    } else {
      searchParams.delete('query');
    }
    setSearchParams(searchParams);
  };

  const handleCenturyChange = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');
    if (currentCenturies.includes(century)) {
      searchParams.delete('centuries');
      currentCenturies
        .filter(c => c !== century)
        .forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }
    setSearchParams(searchParams);
  };

  const resetAllFilters = () => {
    searchParams.delete('sex');
    searchParams.delete('query');
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filters */}
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={getActiveClass('sex', null)}
          to={{
            pathname: '/people',
            search: searchParams.get('query')
              ? `?query=${searchParams.get('query')}`
              : '' +
                (searchParams.has('centuries')
                  ? `&centuries=${searchParams.get('centuries')}`
                  : ''),
          }}
        >
          All
        </Link>

        <Link
          className={getActiveClass('sex', 'm')}
          to={{
            pathname: '/people',
            search: `?sex=m${searchParams.get('query') ? `&query=${searchParams.get('query')}` : ''}${searchParams.get('centuries') ? `&centuries=${searchParams.get('centuries')}` : ''}`,
          }}
        >
          Male
        </Link>

        <Link
          className={getActiveClass('sex', 'f')}
          to={{
            pathname: '/people',
            search: `?sex=f${searchParams.get('query') ? `&query=${searchParams.get('query')}` : ''}${searchParams.get('centuries') ? `&centuries=${searchParams.get('centuries')}` : ''}`,
          }}
        >
          Female
        </Link>
      </p>

      {/* Search Filter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={handleSearchChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* Century Filter Buttons */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <button
                key={century}
                className={`button mr-1 ${searchParams.getAll('centuries').includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
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

      {/* Reset All Filters Button */}
      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

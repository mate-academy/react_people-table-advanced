import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = React.useState<string>('');
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const navigate = useNavigate();

  React.useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const removeQuery = () => {
    const search = new URLSearchParams(searchParams.toString());

    search.delete('query');
    navigate(`?${search.toString()}`);
    setQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    setQuery(value);

    const search = new URLSearchParams(searchParams.toString());

    if (value) {
      search.set('query', value);
    } else {
      search.delete('query');
    }

    navigate(`?${search.toString()}`);
  };

  const isCenturyActive = (century: string) => {
    return currentCenturies.includes(century);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!currentSex ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            {['16', '17', '18', '19', '20'].map(century => {
              const updatedCenturies = isCenturyActive(century)
                ? currentCenturies.filter(c => c !== century)
                : [...currentCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isCenturyActive(century) ? 'is-info' : ''}`}
                  params={{
                    centuries:
                      updatedCenturies.length > 0 ? updatedCenturies : null,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={() => removeQuery()}
          params={{
            sex: null,
            centuries: null,
            query: null,
            sort: null,
            order: null,
            currentQuery: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

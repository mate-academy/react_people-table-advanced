import React from 'react';
//import { useSearchParams } from 'react-router-dom';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  // Handler for the name (query) filter
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(new URLSearchParams(searchParams));
  };

  // Handler for toggling century filters
  const toggleCenturyFilter = (century: string) => {
    const centuries = searchParams.getAll('centuries');

    if (centuries.includes(century)) {
      const updatedCenturies = centuries.filter(c => c !== century);

      searchParams.delete('centuries');
      updatedCenturies.forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }

    setSearchParams(new URLSearchParams(searchParams));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => {
            searchParams.delete('sex');
            setSearchParams(new URLSearchParams(searchParams));
          }}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => {
            searchParams.set('sex', 'm');
            setSearchParams(new URLSearchParams(searchParams));
          }}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => {
            searchParams.set('sex', 'f');
            setSearchParams(new URLSearchParams(searchParams));
          }}
        >
          Female
        </a>
      </p>

      {/* Sorting Options */}
      <p className="panel-tabs" data-cy="SortingOptions">
        <a
          className={!searchParams.get('sort') ? 'is-active' : ''}
          onClick={() => {
            searchParams.delete('sort');
            searchParams.delete('order');
            setSearchParams(new URLSearchParams(searchParams));
          }}
        >
          Default
        </a>
        {['name', 'sex', 'born', 'died'].map(field => (
          <a
            key={field}
            className={searchParams.get('sort') === field ? 'is-active' : ''}
            onClick={() => {
              const currentSort = searchParams.get('sort');
              const currentOrder = searchParams.get('order');

              if (currentSort === field && currentOrder === 'asc') {
                searchParams.set('order', 'desc');
              } else if (currentSort === field && currentOrder === 'desc') {
                searchParams.delete('sort');
                searchParams.delete('order');
              } else {
                searchParams.set('sort', field);
                searchParams.set('order', 'asc');
              }

              setSearchParams(new URLSearchParams(searchParams));
            }}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </a>
        ))}
      </p>

      {/* Name Filter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  searchParams.getAll('centuries').includes(century)
                    ? 'is-info'
                    : ''
                }`}
                onClick={() => toggleCenturyFilter(century)}
              >
                {century}
              </a>
            ))}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(new URLSearchParams(searchParams));
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      {/* Reset All Filters */}
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

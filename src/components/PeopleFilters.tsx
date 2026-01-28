import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const activeSex = searchParams.get('sex') || '';
  const activeCenturies = searchParams.getAll('centuries');
  const allCenturies = ['16', '17', '18', '19', '20'];

  const getToggleCenturyParams = (century: string) => {
    const newCenturies = activeCenturies.includes(century)
      ? activeCenturies.filter(c => c !== century)
      : [...activeCenturies, century];

    return { centuries: newCenturies.length > 0 ? newCenturies : null };
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <div className="block">
        <label className="label"></label>
        <div className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            params={{ sex: null }}
            className={`navbar-item ${activeSex === '' ? 'is-active' : 'has-text-link '}`}
          >
            All
          </SearchLink>

          <SearchLink
            params={{ sex: 'm' }}
            className={`navbar-item ${activeSex === 'm' ? 'is-active' : 'has-text-link '}`}
          >
            Male
          </SearchLink>

          <SearchLink
            params={{ sex: 'f' }}
            className={`navbar-item ${activeSex === 'f' ? 'is-active' : 'has-text-link '}`}
          >
            Female
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="block">
        <label className="label"></label>
        <div
          className="is-flex
          is-justify-content-space-between
          is-align-items-center"
        >
          <div className="buttons mb-0">
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                params={getToggleCenturyParams(century)}
                className={`button is-small ${
                  activeCenturies.includes(century)
                    ? 'is-link'
                    : 'has-background-white has-text-black'
                }`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <SearchLink
            params={{ centuries: null }}
            className={`button is-small is-primary ${
              activeCenturies.length === 0 ? '' : 'is-outlined'
            }`}
          >
            All
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

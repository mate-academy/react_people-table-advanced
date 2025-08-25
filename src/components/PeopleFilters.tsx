import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('query') || '');

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  function handleSexChange(value: string | null) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(cent: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(century => century !== cent)
      : [...centuries, cent];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));

    setSearchParams(params);
  }

  function handleCenturiesClear() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          onClick={() => handleSexChange(null)}
          className={() => (!sex ? 'is-active' : '')}
          to="/people"
        >
          All
        </NavLink>
        <NavLink
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
          className={() => (sex === 'm' ? 'is-active' : '')}
          to="/people"
        >
          Male
        </NavLink>
        <NavLink
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
          }}
          className={() => (sex === 'f' ? 'is-active' : '')}
          to="/people"
        >
          Female
        </NavLink>
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
            {[16, 17, 18, 19, 20].map(c => {
              const century = String(c);

              return (
                <button
                  key={c}
                  onClick={() => handleCenturiesChange(century)}
                  className={
                    'button mr-1' +
                    (centuries.includes(century) ? ' is-info' : '')
                  }
                >
                  {c}
                </button>
              );
            })}
            <button
              onClick={handleCenturiesClear}
              className={
                'button is-success' +
                (centuries.length === 0 ? '' : ' is-outlined')
              }
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};

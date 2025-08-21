import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

type Props = {};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleSexChange(value: string | null) {
    const params = new URLSearchParams(searchParams);

    if (value === null) {
      params.delete('sex');
    } else {
      params.set('sex', value);
    }

    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  }

  function toggleCenturies(ch: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));

    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  }

  const allCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to="#"
          className={() => (!searchParams.get('sex') ? 'is-active' : '')}
          onClick={e => {
            e.preventDefault();
            handleSexChange(null);
          }}
        >
          All
        </NavLink>

        <NavLink
          to="#"
          className={() => (searchParams.get('sex') === 'm' ? 'is-active' : '')}
          onClick={e => {
            e.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </NavLink>

        <NavLink
          to="#"
          className={() => (searchParams.get('sex') === 'f' ? 'is-active' : '')}
          onClick={e => {
            e.preventDefault();
            handleSexChange('f');
          }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={e => handleQueryChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${searchParams.getAll('centuries').includes(c) ? 'is-info' : ''}`}
                onClick={() => toggleCenturies(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${centuries.length === 0 ? 'is-success' : 'is-success is-outlined'}`}
              href="#/people"
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

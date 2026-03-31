import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function getSex(value: string) {
    return getSearchWith(searchParams, { sex: value || null });
  }

  const deleteCenturies = () => {
    setSearchWith({ centuries: null });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchWith({ query: event.target.value.toLowerCase() });
  };

  const toggleCentury = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(c => c !== ch)
      : [...centuries, ch];

    setSearchWith({ centuries: newCenturies });
  };

  const availableCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel people-filters">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink to={`/people?${getSex('')}`}>All</NavLink>
        <NavLink to={`/people?${getSex('m')}`}>Male</NavLink>
        <NavLink to={`/people?${getSex('f')}`}>Female</NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left is-expanded">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile people-filters__century"
          data-cy="CenturyFilter"
        >
          <div className="level-left people-filters__century-buttons">
            {availableCenturies.map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right people-filters__century-all">
            <button
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={deleteCenturies}
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

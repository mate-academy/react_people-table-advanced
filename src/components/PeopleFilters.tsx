import classNames from 'classnames';
import { useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get('query') || '',
  );

  const createLinkWithParam = (key: string, value?: string) => {
    const newParams = new URLSearchParams(location.search);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    return `/people?${newParams.toString()}`;
  };

  const toggleCentury = (century: string) => {
    const newCenturies = new Set(centuries);

    if (newCenturies.has(century)) {
      newCenturies.delete(century);
    } else {
      newCenturies.add(century);
    }

    // Usuń wszystkie obecne centuries
    searchParams.delete('centuries');

    // Dodaj na nowo wybrane centuries
    newCenturies.forEach(c => searchParams.append('centuries', c));

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={createLinkWithParam('sex', undefined)}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </NavLink>

        <NavLink
          to={createLinkWithParam('sex', 'm')}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </NavLink>

        <NavLink
          to={createLinkWithParam('sex', 'f')}
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={searchValue}
            onChange={e => {
              const value = e.target.value;

              setSearchValue(value);

              if (value.trim() === '') {
                searchParams.delete('query');
              } else {
                searchParams.set('query', value);
              }

              setSearchParams(searchParams);
            }}
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
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          onClick={() => setSearchValue('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

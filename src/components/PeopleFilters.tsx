import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

function getSearchWith(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((val) => newParams.append(key, val.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const newSearch = getSearchWith({ query: value || null }, searchParams);

    setSearchParams(newSearch);
  };

  const handleCenturyClick = (century: number) => {
    const centuryStr = century.toString();

    if (centuries.includes(centuryStr)) {
      const newCenturies = centuries.filter((cen) => cen !== centuryStr);

      setSearchWith({ centuries: newCenturies.length ? newCenturies : null });
    } else {
      const newCenturies = [...centuries, centuryStr];

      setSearchWith({ centuries: newCenturies });
    }
  };

  function reset() {
    setSearchWith({
      query: null,
      sex: null,
      centuries: null,
      sort: null,
      order: null,
    });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === null })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
        >
          Female
        </Link>
      </p>

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

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map((century) => {
              const isSelected = centuries.includes(century.toString());

              return (
                <button
                  key={century}
                  type="button"
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isSelected,
                  })}
                  onClick={() => handleCenturyClick(century)}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button is-success is-outlined', {
                'is-active': centuries.length === 0,
              })}
              onClick={() => setSearchWith({ centuries: null })}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              {
                query: null,
                sex: null,
                centuries: null,
                sort: null,
                order: null,
              },
              searchParams,
            ),
          }}
          onClick={() => reset()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

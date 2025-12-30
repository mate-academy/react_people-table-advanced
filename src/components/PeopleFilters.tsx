import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuriesArr = [16, 17, 18, 19, 20];
  const centuries = searchParams.getAll('centuries') || [];
  const currentSex = searchParams.get('sex');

  const getLinkClass = (isActive: boolean, type: string | null) => {
    return classNames({
      'is-active':
        type === null ? isActive && !currentSex : currentSex === type,
    });
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value.trim()) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  function toggleCenturies(cent: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(century => century !== cent)
      : [...centuries, cent];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));

    setSearchParams(params);
  }

  function toggleAllCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  }

  const getSearchWith = (sexValue: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (sexValue === null) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', sexValue);
    }

    return newParams.toString();
  };

  const handleResetAllFillters = () => {
    const newParams = new URLSearchParams();

    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort) {
      newParams.set('sort', currentSort);
    }

    if (currentOrder) {
      newParams.set('order', currentOrder);
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) => getLinkClass(isActive, null)}
          to={{ search: getSearchWith(null) }}
        >
          All
        </NavLink>
        <NavLink
          className={getLinkClass(false, 'm')}
          to={{ search: getSearchWith('m') }}
        >
          Male
        </NavLink>
        <NavLink
          className={getLinkClass(false, 'f')}
          to={{ search: getSearchWith('f') }}
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
            {centuriesArr.map(century => {
              return (
                <button
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century.toString()),
                  })}
                  onClick={() => toggleCenturies(century.toString())}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={() => toggleAllCenturies()}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetAllFillters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

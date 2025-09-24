import { NavLink, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSetSex = (sex: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    return `?${params.toString()}`;
  };

  const handleSetCentury = (century: number | null) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');
    let centuries: string[] = [...current];

    if (century === null) {
      params.delete('centuries');
    } else {
      const centuryStr = century.toString();

      if (centuries.includes(centuryStr)) {
        centuries = centuries.filter(c => c !== centuryStr);
      } else {
        centuries.push(centuryStr);
      }

      params.delete('centuries');
      centuries.forEach(c => params.append('centuries', c));
    }

    return `?${params.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink to={handleSetSex(null)}>All</NavLink>
        <NavLink to={handleSetSex('m')}>Male</NavLink>
        <NavLink to={handleSetSex('f')}>Female</NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={handleSetQuery}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => (
              <NavLink
                key={c}
                data-cy="century"
                to={handleSetCentury(c)}
                className={classNames('button mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(c.toString()),
                })}
              >
                {c}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              to={handleSetCentury(null)}
              className={classNames('button is-outlined', {
                'is-success': searchParams.getAll('centuries').length === 0,
              })}
            >
              All
            </NavLink>
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

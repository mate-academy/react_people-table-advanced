import classNames from 'classnames';
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface Props {
  sex: string | null;
  query: string;
  centuries: string[];
  handleSex: (gender: string) => string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  resetFilters: () => string;
}

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
  handleSex,
  searchParams,
  setSearchParams,
  resetFilters,
}) => {
  const { pathname } = useLocation();

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params);
  };

  const handleCenturies = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const allCenturies = params.getAll('centuries');
    const activeCenturies = allCenturies.includes(century)
      ? centuries.filter(current => current !== century)
      : [...centuries, century];

    params.delete('centuries');
    activeCenturies.forEach(current => params.append('centuries', current));

    return `${pathname}?${params.toString()}`;
  };

  const handleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={`${handleSex('all')}`}
          className={classNames('', { 'is-active': sex === null })}
        >
          All
        </NavLink>
        <NavLink
          to={`${handleSex('m')}`}
          className={classNames('', { 'is-active': sex === 'm' })}
        >
          Male
        </NavLink>
        <NavLink
          to={`${handleSex('f')}`}
          className={classNames('', { 'is-active': sex === 'f' })}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => {
              return (
                <Link
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  to={handleCenturies(century)}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': centuries.length === 0,
              })}
              to={handleAllCenturies()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={resetFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

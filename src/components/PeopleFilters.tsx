import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC
  = () => {
    const [isActive, setIsActive] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [filter, setFilter] = useState('');
    const [centFilter, setCentFilter] = useState('');
    const centuries = ['16', '17', '18', '19', '20'];

    const handleAllClick = () => {
      setIsActive(!isActive);
      setFilter('all');
    };

    const handleMalelClick = () => {
      setIsActive(!isActive);
      setFilter('m');
    };

    const handleFemaleClick = () => {
      setIsActive(!isActive);
      setFilter('f');
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const search
        = getSearchWith(searchParams, { query: e.target.value || null });

      setSearchParams(search);
    };

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <Link
            to="?all"
            className={classNames({ 'is-active': filter === 'all' })}
            onClick={handleAllClick}
          >
            All
          </Link>
          <Link
            to="?sex=m"
            className={classNames({ 'is-active': filter === 'm' })}
            onClick={handleMalelClick}
          >
            Male
          </Link>
          <Link
            to="?sex=f"
            className={classNames({ 'is-active': filter === 'f' })}
            onClick={handleFemaleClick}
          >
            Female
          </Link>
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              onChange={handleQueryChange}
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuries.map((century) => (
                <a
                  data-cy="century"
                  className={classNames('button mr-1',
                    { 'is-info': centFilter === century })}
                  href={`#/people?centuries=${century}`}
                  onClick={() => {
                    setIsActive(!isActive);
                    setCentFilter(century.toString());
                  }}
                >
                  {century}
                </a>
              ))}
            </div>

            <div className="level-right ml-4">
              <Link
                data-cy="centuryALL"
                className="button is-success is-outlined"
                to="?all"
              >
                All
              </Link>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            className="button is-link is-outlined is-fullwidth"
            to="#/people"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    );
  };

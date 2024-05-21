import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { search } = useLocation();

  const centuriesArray = ['16', '17', '18', '19', '20'];
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: any) {
    const getSearch = getSearchWith(searchParams, params);

    setSearchParams(getSearch);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchWith({ query: null });
    } else {
      setSearchWith({ query: event.target.value });
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !search.includes('sex=m') && !search.includes('sex=f'),
          })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': search.includes('sex=m') })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': search.includes('sex=f') })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {centuriesArray.map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cent),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(cent)
                      ? centuries.filter(century => century !== cent)
                      : [...centuries, cent],
                  }),
                }}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              query: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

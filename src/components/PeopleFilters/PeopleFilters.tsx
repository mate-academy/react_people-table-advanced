import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import React from 'react';
import classNames from 'classnames';

type Params = {
  [key: string]: string | string[] | null;
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const gender = searchParams.get('sex') as string | null;
  const centuries = searchParams.getAll('centuries');

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function handleSexChange(sex: 'f' | 'm' | null) {
    return {
      search: getSearchWith(searchParams, { sex: sex }),
    };
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !gender })}
          to={handleSexChange(null)}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': gender === 'm' })}
          to={handleSexChange('m')}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': gender === 'f' })}
          to={handleSexChange('f')}
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
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                data-cy="century"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century.toString())
                      ? centuries.filter(c => c !== century.toString())
                      : [...centuries, century.toString()],
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith(searchParams, {
                  centuries: [],
                }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

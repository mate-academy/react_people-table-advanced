import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEventHandler } from 'react';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { CenturiesFilter } from '../types/CenturiesFilter';
import classNames from 'classnames';
import { SexFilter } from '../types/SexFilter';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (paramsToUpdate: SearchParams) => {
    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  };

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const queryHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchWith({ query: e.target.value || null });
  };

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {Object.entries(SexFilter).map(([key, value]) => (
            <Link
              key={value}
              className={classNames({
                'is-active': sex === value || (!sex && value === 'all'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  sex: value !== 'all' ? value : null,
                }),
              }}
            >
              {key}
            </Link>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={queryHandler}
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
              {Object.values(CenturiesFilter).map(century => (
                <Link
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: centuries.includes(century)
                        ? centuries.filter(c => c !== century)
                        : [...centuries, century],
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
                className={classNames('button is-success', {
                  'is-outlined': centuries.length,
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: null,
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
            to="/people"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    </div>
  );
};

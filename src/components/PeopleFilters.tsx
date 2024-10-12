import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEventHandler, useCallback } from 'react';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { CenturiesFilter } from '../types/CenturiesFilter';
import classNames from 'classnames';
import { SexFilter } from '../types/SexFilter';
import { SexFilterLink } from './SexFilterLink';
import { CenturyFilterLink } from './CenturyFilterLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (paramsToUpdate: SearchParams) => {
    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  };

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const queryHandler: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setSearchWith({ query: e.target.value || null });
  }, []);

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {Object.entries(SexFilter).map(([key, value]) => (
            <SexFilterLink
              key={value}
              field={key as keyof typeof SexFilter}
              value={value}
            />
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
                <CenturyFilterLink key={century} century={century} />
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

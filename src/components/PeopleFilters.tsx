import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  query: string,
  setQuery: (query: string) => void,
  centuries: string[],
  searchParams: URLSearchParams,
  sex: string,
}

export const PeopleFilters: FC<Props> = ({
  query,
  setQuery,
  centuries,
  searchParams,
  sex,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith((searchParams), ({ sex: null })) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith((searchParams), ({ sex: 'm' })) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith((searchParams), ({ sex: 'f' })) }}
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
            onChange={(event) => setQuery(event.target.value)}
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
              <Link
                key={century}
                to={{
                  search: getSearchWith((searchParams), {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
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
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

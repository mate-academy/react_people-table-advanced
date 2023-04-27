import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  query: string,
  setQuery: (query: string) => void,
  centuries: string[],
  sex: string,
  searchParams: URLSearchParams,
}

export const PeopleFilters: FC<Props> = ({
  query,
  setQuery,
  centuries,
  sex,
  searchParams,
}) => {
  const centuriesArray = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith((searchParams), ({ sex: null })),
          }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </Link>
        <Link
          to={{
            search: getSearchWith((searchParams), ({ sex: 'm' })),
          }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{
            search: getSearchWith((searchParams), ({ sex: 'f' })),
          }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            {centuriesArray.map(century => (
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
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

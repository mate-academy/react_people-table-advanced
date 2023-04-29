import classNames from 'classnames';
import {
  Link,
  URLSearchParamsInit,
} from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: unknown;
  } | undefined) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
            }),
          }}
          className={
            classNames(
              { 'is-active': !sex.length },
            )
          }
        >
          All
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, {
              sex: 'm',
            }),
          }}
          className={
            classNames(
              { 'is-active': sex === 'm' },
            )
          }
        >
          Male
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, {
              sex: 'f',
            }),
          }}
          className={
            classNames(
              { 'is-active': sex === 'f' },
            )
          }
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={onQueryChange}
            className="input"
            placeholder="Search"
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
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                className={
                  classNames(
                    'button mr-1',
                    { 'is-info': centuries.includes(century) },
                  )
                }
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
                search: getSearchWith(searchParams, { centuries: null }),
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
          to={{
            search: getSearchWith(
              searchParams,
              {
                centuries: null,
                sex: null,
                query: null,
              },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

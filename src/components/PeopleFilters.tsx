import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className="is-active"
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className=""
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className=""
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className="button mr-1"
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: ['16'] }),
              }}
            >
              16
            </Link>

            <Link data-cy="century" className="button mr-1 is-info" to={{}}>
              17
            </Link>

            <Link
              data-cy="century"
              className="button mr-1 is-info"
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: ['18'] }),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className="button mr-1 is-info"
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: ['19'] }),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className="button mr-1"
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: ['16', '17', '18', '19'],
                }),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: '16' }),
              }}
            >
              All
            </Link>
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

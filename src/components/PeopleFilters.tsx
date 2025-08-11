import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { useFilters } from '../store/FiltersContext';

export const PeopleFilters = () => {
  const filters = useFilters();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': filters.sex.length === 0,
          })}
          to={{
            search: getSearchWith(filters.searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': filters.sex.includes('m'),
          })}
          to={{
            search: getSearchWith(filters.searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': filters.sex.includes('f'),
          })}
          to={{
            search: getSearchWith(filters.searchParams, { sex: 'f' }),
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
            value={filters.query}
            onChange={filters.handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': filters.century.includes(cent),
                })}
                to={{
                  search: getSearchWith(filters.searchParams, {
                    century: filters.toggleCentury(cent),
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
                'is-outlined': filters.century.length > 0,
              })}
              to={{
                search: getSearchWith(filters.searchParams, { century: null }),
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

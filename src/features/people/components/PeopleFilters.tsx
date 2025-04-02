import { Link } from 'react-router-dom';
import { usePeopleFilterParams } from '../hooks/usePeopleFilterParams';
import { centuries } from './centuries';

export const PeopleFilters = () => {
  const { setSexFilter, toggleCenturiesFilter, currentCenturiesFilter } =
    usePeopleFilterParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className="is-active"
          to="#"
          onClick={e => {
            e.preventDefault();
            setSexFilter({ sex: null });
          }}
        >
          All
        </Link>
        <Link
          className=""
          to="#"
          onClick={e => {
            e.preventDefault();
            setSexFilter({ sex: 'm' });
          }}
        >
          Male
        </Link>
        <Link
          className=""
          to="#"
          onClick={e => {
            e.preventDefault();
            setSexFilter({ sex: 'f' });
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
            {centuries.map(century => {
              return (
                <Link
                  key={`${century}-century`}
                  data-cy="century"
                  className={`button mr-1 ${currentCenturiesFilter.includes(century) ? 'is-info' : ''}`}
                  to="#"
                  onClick={e => {
                    e.preventDefault();
                    toggleCenturiesFilter(century);
                  }}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
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

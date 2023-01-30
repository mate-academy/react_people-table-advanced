import { Link } from 'react-router-dom';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        <Link
          className="is-active"
          to="#/people"
        >
          All
        </Link>
        <Link
          className=""
          to="?sex=m"
        >
          Male
        </Link>
        <Link
          className=""
          to="?sex=f"
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
            <i
              className="fas fa-search"
              aria-hidden="true"
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            <Link
              data-cy="century"
              className="button mr-1"
              to="?centuries=16"
            >
              16
            </Link>

            <Link
              data-cy="century"
              className="button mr-1 is-info"
              to="?centuries=17"
            >
              17
            </Link>

            <Link
              data-cy="century"
              className="button mr-1 is-info"
              to="?centuries=18"
            >
              18
            </Link>

            <Link
              data-cy="century"
              className="button mr-1 is-info"
              to="?centuries=19"
            >
              19
            </Link>

            <Link
              data-cy="century"
              className="button mr-1"
              to="?centuries=20"
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
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

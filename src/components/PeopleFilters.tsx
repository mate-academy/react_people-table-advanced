import { Link } from 'react-router-dom';
import { Centuries } from '../types/Centuries';
import { Gender } from '../types/Gender';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Gender).map((sex) => (
          <Link
            key={sex}
            className={sex === Gender.ALL ? 'is-active' : ''}
            to={sex === Gender.ALL ? '.' : `?sex=${sex.toLowerCase().charAt(0)}`}
          >
            {sex}
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
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Centuries).map((century) => (
              <Link
                key={century}
                data-cy="century"
                className="button mr-1 is-info"
                to={`?centuries=${century}`}
              >
                {century}
              </Link>
            ))}
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="."
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

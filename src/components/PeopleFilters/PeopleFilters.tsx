import classNames from "classnames";
import { FILTER } from "../../types/filters";
import { Link } from "react-router-dom"; 

type Props = {
  filterSex: FILTER,
  handleSexFilterChange: (sex?: FILTER) => void,
  query: string,
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>,
  centuries: string[],
  handleCenturiesFilter: (ch: string) => void,
  handleSelectAllCenturies: () => void,
}

export const PeopleFilters: React.FC<Props> = ({ 
  filterSex, 
  handleSexFilterChange,
  query,
  handleQueryChange,
  centuries,
  handleCenturiesFilter,
  handleSelectAllCenturies,
}) => {
  const arrCenturies = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link className={classNames({'is-active': filterSex === FILTER.ALL})} to="/people" 
          onClick={(e) => {
            e.preventDefault();
            handleSexFilterChange();
          }}
        >
          All
        </Link>
        <Link className={classNames({'is-active': filterSex === FILTER.MALE})} to="/people?sex=m" 
          onClick={(e) => {
            e.preventDefault();
            handleSexFilterChange(FILTER.MALE);
          }}
        >
          Male
        </Link>
        <Link className={classNames({'is-active': filterSex === FILTER.FEMALE})} to="/people?sex=f" 
          onClick={(e) => {
            e.preventDefault();
            handleSexFilterChange(FILTER.FEMALE);
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
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrCenturies.map(century => (
              <Link
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={`/people?centuries=${century}`}
                key={century}
                onClick={(e) => {
                  e.preventDefault();
                  handleCenturiesFilter(century.toString());
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
                'is-outlined': centuries.length !== 0,
              })}
              to="/people"
              onClick={(e) => {
                e.preventDefault();
                handleSelectAllCenturies(); 
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
  );
};

import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  handleFilter: (value: string) => void,
  handleCentury:(value: string) => void,
  century: string[],
  sex: string,
  query: string
  hendleQuery: (value: string) => void,
};

export const PeopleFilters:React.FC<Props> = ({
  handleFilter,
  handleCentury,
  century,
  sex,
  query,
  hendleQuery,
}) => {
  const { search } = useLocation();
  const centuryArray = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': sex === '',
          })}
          href="#/people"
        >
          All
        </a>
        <a
          href="#/people?sex=m"
          className={classNames({
            'is-active': sex === 'm',
          })}
          onClick={(e) => {
            e.preventDefault();
            handleFilter('m');
          }}
        >
          Male
        </a>
        <a
          href="#/people?sex=f"
          className={classNames({
            'is-active': sex === 'f',
          })}
          onClick={(e) => {
            e.preventDefault();
            handleFilter('f');
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={(e) => hendleQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryArray.map(num => (
              <a
                key={num}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': century.includes(num.toString()),
                })}
                href={`#/people?centuries=${num}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCentury(num.toString());
                }}
              >
                {num}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': century.length,
              })}
              href={`#/people/${search}`}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={() => hendleQuery('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

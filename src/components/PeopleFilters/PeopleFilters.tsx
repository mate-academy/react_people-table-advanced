import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';
import { GenderFilters, SearchQueries } from '../../types';

const centutriesToFilter = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleCentruies = (centr: string): string => {
    const curCentr = searchParams.getAll(SearchQueries.centuries);
    const newCentr = curCentr.includes(centr)
      ? curCentr.filter(c => c !== centr)
      : [...curCentr, centr];

    return getSearchWith(searchParams, { [SearchQueries.centuries]: newCentr });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(GenderFilters).map(filter => {
          const filterKey = GenderFilters[filter as keyof typeof GenderFilters];

          return (
            <Link
              key={filterKey}
              className={classNames({
                'is-active': searchParams.get(SearchQueries.sex) === filterKey,
              })}
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, {
                  [SearchQueries.sex]: filterKey,
                }),
              }}
            >
              {filter
                .split('')
                .map((ch, i) => (i == 0 ? ch.toLocaleUpperCase() : ch))}
            </Link>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => {
              setSearchParams(
                getSearchWith(searchParams, {
                  [SearchQueries.query]: e.target.value || null,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centutriesToFilter.map(centr => {
              return (
                <Link
                  key={centr}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': searchParams
                      .getAll(SearchQueries.centuries)
                      .includes(centr),
                  })}
                  to={{
                    pathname: '/people',
                    search: toggleCentruies(centr),
                  }}
                >
                  {centr}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.get(SearchQueries.centuries),
              })}
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
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
            pathname: '/people',
            search: getSearchWith(searchParams, {
              centuries: [],
              sex: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};

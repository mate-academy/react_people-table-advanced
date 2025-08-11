import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { GenderFilter } from '../enums/Filters';
import { getSearchWith } from '../utils/searchHelper';

type PeopleFiltersProps = {
  searchParams: URLSearchParams;
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (filter: GenderFilter) => void;
  genderFilter: GenderFilter;
  handleCenturyChange: (century: string) => void;
  centuryFilter: string[];
  resetAllFilters: () => void;
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  searchParams,
  query,
  handleQueryChange,
  handleFilterChange,
  genderFilter,
  handleCenturyChange,
  centuryFilter,
  resetAllFilters,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.ALL,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          onClick={() => handleFilterChange(GenderFilter.ALL)}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.MALE,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          onClick={() => handleFilterChange(GenderFilter.MALE)}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.FEMALE,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          onClick={() => handleFilterChange(GenderFilter.FEMALE)}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: [...centuryFilter, century],
                  }),
                }}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuryFilter.length > 0,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: ['16', '17', '18', '19', '20'],
                }),
              }}
              onClick={() => handleCenturyChange('all')}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};

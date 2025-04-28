import { FC } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  filterChange: (params: any, searchParams: any) => void;
};

enum FilterGander {
  all = 'all',
  m = 'm',
  f = 'f',
}
type Gander = 'all' | 'm' | 'f';

type FilterCentury = '16' | '17' | '18' | '19' | '20';

export const PeopleFilters: FC<Props> = ({ filterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const newQuery = searchParams.get('newQuery') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.name === 'query') {
      params.set('query', e.target.value);
    } else {
      params.set('newQuery', e.target.value);
    }
    setSearchParams(params);
  };

  const handleGanderChange = (sex: Gander) => {
    const params = new URLSearchParams(searchParams);
    params.set('sex', sex);
    setSearchParams(params);
  };

  console.log(searchParams.toString());

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {/* <SearchLink params={{ gander: FilterGander.all }}>All</SearchLink> */}
        <button
          className="is-active"
          onClick={() => handleGanderChange(FilterGander.all)}
        >
          All
        </button>
        <button className="" onClick={() => handleGanderChange(FilterGander.m)}>
          Male
        </button>
        <button className="" onClick={() => handleGanderChange(FilterGander.f)}>
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            name="query"
            value={query}
            onChange={handleFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            name="newQuery"
            value={newQuery}
            onChange={handleFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className="button mr-1"
              to="#/people?centuries=16"
            >
              16
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=17"
            >
              17
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=18"
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1 is-info"
              to="#/people?centuries=19"
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className="button mr-1"
              to="#/people?centuries=20"
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
            >
              All
            </NavLink>
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

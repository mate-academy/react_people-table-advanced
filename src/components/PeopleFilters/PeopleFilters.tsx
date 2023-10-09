/* eslint-disable no-console */
// import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CenturyFilter } from '../CenturyFilter';

export const PeopleFilters = () => {
  // const [filterName, setFilterName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [year, setYear] = useState(1900);
  // const history = useHistory();

  const query = searchParams.get('query') || '';
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={onChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <CenturyFilter />

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

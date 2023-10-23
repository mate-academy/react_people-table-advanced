/* eslint-disable */
// import { SearchParams } from '../utils/searchHelper';
import { useState } from 'react';
import { SearchLink } from './SearchLink';
// import { useSearchParams } from 'react-router-dom';
// import { URLSearchParams } from 'url';

export const PeopleFilters = () => {
  // const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('')

  function addFiltersMale() {
    return { sex: 'm' };
  }
  function addFiltersFemale() {
    return { sex: 'f' };
  }
  function addFiltersAllSex() {
    return { sex: null };
  }
  function searchFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    console.log(query);

    const params = new URLSearchParams();

    params.set('query', e.target.value);
  }
  // setSearchParams({ query: query })
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className="is-active" params={addFiltersAllSex()}>All</SearchLink>
        <SearchLink className="" params={addFiltersMale()}>Male</SearchLink>
        <SearchLink className="" params={addFiltersFemale()}>Female</SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(e) =>searchFilter(e)}
          />
          {/* <SearchLink params={{ query: query }}/> */}
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
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

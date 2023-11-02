/* eslint-disable */
import { useState } from 'react';
import { SearchLink } from './SearchLink';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('')
    // const query = searchParams.get('query');

  // const [sexState, setSexState] = useState('')

  function addFiltersMale() {
    // setSexState()
    return { sex: 'm' };
  }

  function addFiltersFemale() {
    return { sex: 'f' };
  }

  function addFiltersAllSex() {
    return { sex: null };
  }


function addCenturies(century: string) {
  let centuryArray = searchParams.getAll ('centuries') || [];
  centuryArray = [...centuryArray, century];
  return { centuries: centuryArray }
}

  const params = new URLSearchParams(searchParams);

  function searchFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    params.set('query', e.target.value);
    setSearchParams(params)
  }

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
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={addCenturies('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={addCenturies('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={addCenturies('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={addCenturies('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={addCenturies('20')}
            >
              20
            </SearchLink>
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

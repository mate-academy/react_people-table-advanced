import { useEffect, useState } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }
  }, [searchQuery, searchParams, setSearchParams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>All</SearchLink>
        <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
        <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
        {/* <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a> */}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
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
              params={{ centuries: ['16'] }}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: ['17'] }}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: ['18'] }}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: ['19'] }}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: ['20'] }}
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

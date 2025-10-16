import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    if (query.trim() === '') {
      const newParams = getSearchWith(searchParams, { query: null });

      setSearchParams(newParams);
    } else {
      const newParams = getSearchWith(searchParams, { query });

      setSearchParams(newParams);
    }
  }, [query]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{}}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

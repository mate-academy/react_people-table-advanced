import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          value={query}
          type="search"
          className="input"
          placeholder="Search"
          onChange={(e) => {
            setSearchParams(
              getSearchWith(searchParams, { query: e.target.value || null }),
            );
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

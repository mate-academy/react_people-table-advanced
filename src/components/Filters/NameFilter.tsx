import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchRequest } from '../../Utils/searchMagicHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          className="input"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setSearchParams(
            getSearchRequest(
              searchParams,
              { query: event.target.value || null },
            ),
          )}

        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

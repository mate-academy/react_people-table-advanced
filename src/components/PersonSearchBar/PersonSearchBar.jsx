import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

export const PersonSearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const applyQuery = useCallback(debounce((newQuery) => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  }, 500), []);

  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            applyQuery(event.target.value);
          }}
          className="input"
          type="text"
          placeholder="Enter name of person you want to find"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search" />
        </span>
      </div>
    </div>
  );
};

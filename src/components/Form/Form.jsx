import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import debounce from 'lodash/debounce';

export function Form() {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const applyQuery = useCallback(debounce((newQuery) => {
    if (newQuery) {
      searchParams.delete('sortBy');
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    history.push(`?${searchParams.toString()}`);
  }, 1000), []);

  const onChange = (event) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  return (
    <form>
      <div className="field">
        <div className="control">
          <label className="label">
            User Name
            <input
              className="input"
              type="text"
              placeholder="user name"
              value={query}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
    </form>
  );
}

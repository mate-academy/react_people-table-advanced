/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

export const Form = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const appliedQuery = searchParams.get('query');

  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push(`?${searchParams.toString()}`);
    }, 1000),
    [],
  );

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <form className="form">

      <div className="field">
        <label className="label" htmlFor="search">
          Search:
        </label>
        <input
          className="input"
          id="search"
          placeholder="Enter person's name"
          onChange={handleQueryChange}
        />
      </div>
    </form>
  );
};

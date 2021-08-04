/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

export const Form = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const appliedQuery = searchParams.get('query');
  const newPersonFormIsVisible = searchParams.get('newPersonFormIsVisible')
    || '';
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
    }, 500),
    [],
  );

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleClick = (event) => {
    if (event.target.value === 'true') {
      searchParams.set('newPersonFormIsVisible', event.target.value);
    } else {
      searchParams.delete('newPersonFormIsVisible');
    }

    history.push(`?${searchParams.toString()}`);
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

      {!newPersonFormIsVisible && (
        <button
          type="button"
          className="button is-success btn-open-form"
          value="true"
          onClick={handleClick}
        >
          Add a new person
        </button>
      )}

      {newPersonFormIsVisible && (
        <button
          type="button"
          className="button is-danger btn-open-form"
          value="false"
          onClick={handleClick}
        >
          Cancel adding a new person
        </button>
      )}
    </form>
  );
};

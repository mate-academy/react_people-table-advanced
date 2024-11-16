import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const NameFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          onChange={handleQueryChange}
          value={query}
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

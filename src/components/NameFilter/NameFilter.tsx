import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: newQuery.trim() || null,
      }),
    );
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};

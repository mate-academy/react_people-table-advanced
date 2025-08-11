import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../../types/Filter';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get('query') as Filter['query']) || '';

  function setSearchWith(params: Partial<Filter>) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value });
  }

  return (
    <div className="panel-block">
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
    </div>
  );
};

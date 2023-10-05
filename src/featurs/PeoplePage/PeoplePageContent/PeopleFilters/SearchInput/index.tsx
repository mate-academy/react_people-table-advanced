import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('query', `${e.target.value}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={searchParams.get('query') || ''}
          onChange={handleInputChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchParam from '../../constants/searchParam';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get(SearchParam.Search) || '';
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const newParam = {
      [SearchParam.Search]: event.target.value || null,
    };

    setSearchParams(getSearchWith(searchParams, newParam));
  };

  return (
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};

import React, { useCallback } from 'react';
import { getSearchWith } from '../../../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchFilter: React.FC<Props> = ({ query, setQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value.length) {
        const searchFilter = value.length
          ? { query: value.toLowerCase() }
          : { query: null };

        setQuery(value);
        setSearchParams(getSearchWith(searchParams, searchFilter));

        return;
      }

      setQuery('');
      setSearchParams(getSearchWith(searchParams, { query: null }));
    },
    [searchParams, setSearchParams, setQuery],
  );

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search by Names"
          value={query}
          onChange={handleSearchChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

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

      if (value === '') {
        setQuery('');
        setSearchParams(getSearchWith(searchParams, { query: null }));
      }

      const regex = /[a-zA-Z]+/;

      const valueToUse = value
        .split('')
        .filter(x => regex.test(x))
        .join('');

      const searchFilter = event.target.value.length
        ? { query: valueToUse.toLowerCase() }
        : { query: null };

      setQuery(valueToUse);
      if (valueToUse.length) {
        setSearchParams(getSearchWith(searchParams, searchFilter));
      }
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

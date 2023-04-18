import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';
import { queryParam } from '../../../common/constants';

export const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { [queryParam]: changeEvent.target.value || null },
      ),
    );
  };

  const query = searchParams.get(queryParam) || '';

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

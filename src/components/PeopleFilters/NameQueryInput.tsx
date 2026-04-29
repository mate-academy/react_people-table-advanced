import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';
import FilterParam from '../../types/Filter';

const NameQueryInputBase = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameParam = searchParams.get(FilterParam.Name) || '';

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          value={nameParam}
          onChange={e => {
            setSearchParams(
              getSearchWith(searchParams, {
                name: e.target.value || null,
              }),
            );
          }}
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

export const NameQueryInput = React.memo(NameQueryInputBase);

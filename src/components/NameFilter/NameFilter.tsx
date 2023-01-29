import React, { memo } from 'react';

type Props = {
  query: string | null,
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const NameFilter: React.FC<Props> = memo(({
  query,
  onQueryChange,
}) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query || ''}
          onChange={onQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
});

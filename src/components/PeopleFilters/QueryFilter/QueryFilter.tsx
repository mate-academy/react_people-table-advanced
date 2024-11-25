import React from 'react';

type Props = {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QueryFilter: React.FC<Props> = ({ query, onChange }) => (
  <div className="panel-block">
    <p className="control has-icons-left">
      <input
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
        value={query}
        onChange={onChange}
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  </div>
);

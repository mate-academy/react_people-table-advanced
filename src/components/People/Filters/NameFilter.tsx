import React from 'react';

type Props = {
  query: string,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const NameFilter: React.FC<Props> = ({
  query,
  handleInputChange,
}) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={(event) => handleInputChange(event)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

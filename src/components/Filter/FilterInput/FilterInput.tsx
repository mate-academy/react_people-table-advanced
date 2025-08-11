import React from 'react';

interface Props {
  onChangeInput: (text: string) => void;
}

export const FilterInput: React.FC<Props> = ({ onChangeInput }) => {
  return (
    <p className="control has-icons-left">
      <input
        onChange={event => onChangeInput(event.currentTarget.value)}
        data-cy="NameFilter"
        type="search"
        className="input"
        placeholder="Search"
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
    </p>
  );
};

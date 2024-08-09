import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuery, changeStatus, removeQuery } from '../../features/filter';
import { AllOptions } from '../../types/AllOptions';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);
  const options = [AllOptions.All, AllOptions.Active, AllOptions.Completed];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            style={{ textTransform: 'capitalize' }}
            value={filters.status}
            onChange={e => dispatch(changeStatus(e.target.value as AllOptions))}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filters.query}
          onChange={e => dispatch(addQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(removeQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};

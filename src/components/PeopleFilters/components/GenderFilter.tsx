import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React, { useCallback } from 'react';
import { updateSearchParams } from '../../PeopleTable/utils/updateSearchParams';

const GenderFilters = ['All', 'Male', 'Female'];

export const GenderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenderFilterClick = useCallback(
    (event: React.MouseEvent) => {
      const params = new URLSearchParams(searchParams);

      updateSearchParams(event, params, setSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {GenderFilters.map(filter => {
        const isGenderFilterNotActive = !searchParams.has('sex');
        const isGenderFilterActive =
          searchParams.get('sex') === filter[0].toLowerCase();
        const isHighlighted = isGenderFilterNotActive
          ? filter === 'All'
          : isGenderFilterActive;

        return (
          <a
            key={filter}
            data-gender={filter}
            className={classNames({ 'is-active': isHighlighted })}
            onClick={handleGenderFilterClick}
          >
            {filter}
          </a>
        );
      })}
    </p>
  );
};

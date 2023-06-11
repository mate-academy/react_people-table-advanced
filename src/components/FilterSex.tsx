import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../types/enum';

interface Props {
  sexFilter: string,
  sexFilterHandler: (value: FilterType) => void,
}

export const FilterSex: React.FC<Props> = ({
  sexFilter,
  sexFilterHandler,
}) => {
  const sexes = ['All', 'Male', 'Female'];

  const sexFilterMapping: { [key: string]: FilterType } = {
    All: FilterType.All,
    Male: FilterType.Male,
    Female: FilterType.Female,
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexes.map((sex) => {
        return (
          <NavLink
            className={sexFilter === sexFilterMapping[sex]
              ? 'is-active'
              : ''}
            to="#/people"
            onClick={() => sexFilterHandler(sexFilterMapping[sex])}
            role="button"
          >
            {sex}
          </NavLink>
        );
      })}
    </p>
  );
};

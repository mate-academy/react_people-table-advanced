import React from 'react';
import { FilterType } from '../types/enum';
import { SearchLink } from './SearchLink';

interface Props {
  sexFilter: string | null,
  sexFilterHandler: (value: FilterType) => void,
}

const sexOptions = ['All', 'Male', 'Female'];

const sexFilterMapping: { [key: string]: FilterType } = {
  All: FilterType.All,
  Male: FilterType.Male,
  Female: FilterType.Female,
};

export const FilterSex: React.FC<Props> = ({
  sexFilter,
  sexFilterHandler,
}) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexOptions.map((sex) => {
        return (
          <SearchLink
            className={sexFilter === sexFilterMapping[sex] ? 'is-active' : ''}
            params={{ sex: sex === FilterType.All ? null : [String(sex)] }}
            onClick={() => sexFilterHandler(sexFilterMapping[sex])}
            role="button"
            key={sex}
          >
            {sex}
          </SearchLink>
        );
      })}
    </p>
  );
};

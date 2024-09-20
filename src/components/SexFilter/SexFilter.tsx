import React from 'react';
import { FilterSex } from '../../constants/FilterSex';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

interface Props {
  selectedSex: string | null;
}

export const SexFilter: React.FC<Props> = ({ selectedSex }) => {
  const getParams = (sex: string) => {
    return sex !== FilterSex.All ? sex : null;
  };

  const isFilterActive = (sex: string) => {
    const param = getParams(sex);

    return param === (selectedSex || null);
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(FilterSex).map(([label, sex]) => (
        <SearchLink
          key={sex}
          className={classNames({ 'is-active': isFilterActive(sex) })}
          params={{ sex: getParams(sex) }}
        >
          {label}
        </SearchLink>
      ))}
    </p>
  );
};

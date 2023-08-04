import React from 'react';
import cn from 'classnames';
import { SexFilter } from '../../types/SexFilter';
import { SearchLink } from '../SearchLink';

type Props = {
  title: string,
  value: SexFilter,
  activeSexFilter: SexFilter,
  onSexChange: (newSex: SexFilter) => void,
};

export const SexFilterItem: React.FC<Props> = ({
  title,
  value,
  activeSexFilter,
  onSexChange,
}) => {
  return (
    <SearchLink
      className={cn({
        'is-active': value === activeSexFilter,
      })}
      onClick={() => onSexChange(value)}
      params={{ sex: value || null }}
    >
      {title}
    </SearchLink>
  );
};

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  value: string,
};

export const CenturyItem: React.FC<Props> = ({ value }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const isSelected = centuries.includes(value);

  const toggleCentury = (curCentury: string) => {
    return centuries.includes(curCentury)
      ? centuries.filter((age: string) => age !== curCentury)
      : [...centuries, curCentury];
  };

  return (
    <SearchLink
      data-cy="century"
      className={cn(
        'button',
        'mr-1',
        { 'is-info': isSelected },
      )}
      params={{ centuries: toggleCentury(value) }}
    >
      {value}
    </SearchLink>
  );
};

import React from 'react';
import cn from 'classnames';
import { SexFilterValues } from './SexFilterValues';
import { SearchLink } from '../SearchLink';

type Props = {
  sex: string | null,
};

export const SexFilter: React.FC<Props> = ({ sex }) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {SexFilterValues.map(status => (
        <SearchLink
          className={cn({
            'is-active': sex === status.value,
          })}
          params={{ sex: status.value }}
          key={status.id}
        >
          {status.title}
        </SearchLink>
      ))}
    </p>
  );
};

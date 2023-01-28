import React from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { sexFilterStatuses } from './sexFilterStatuses';

interface Props {
  sex: string | null;
}

export const PeopleSexFilter: React.FC<Props> = React.memo(({
  sex,
}) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexFilterStatuses.map(status => (
        <SearchLink
          key={status.id}
          params={{ sex: status.value }}
          className={cn({ 'is-active': sex === status.value })}
        >
          {status.title}
        </SearchLink>
      ))}
    </p>
  );
});

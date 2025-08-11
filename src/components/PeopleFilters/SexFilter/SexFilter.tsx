import React from 'react';
import cn from 'classnames';

import { SearchLink } from '../../SearchLink/SearchLink';

type Props = {
  sex: string;
};

export const SexFilter: React.FC<Props> = ({ sex }) => (
  <p className="panel-tabs" data-cy="SexFilter">
    <SearchLink className={cn({ 'is-active': !sex })} params={{ sex: null }}>
      All
    </SearchLink>
    <SearchLink
      className={cn({ 'is-active': sex === 'm' })}
      params={{ sex: 'm' }}
    >
      Male
    </SearchLink>
    <SearchLink
      className={cn({ 'is-active': sex === 'f' })}
      params={{ sex: 'f' }}
    >
      Female
    </SearchLink>
  </p>
);

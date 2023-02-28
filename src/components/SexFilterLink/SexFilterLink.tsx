import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SexFilterType } from '../../types/SexFilterType';

type Props = {
  value: SexFilterType,
  children: React.ReactNode
};

export const SexFilterLink: React.FC<Props> = ({
  value,
  children,
}) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || SexFilterType.All;

  return (
    <SearchLink
      className={cn({ 'is-active': sex === value })}
      params={{ sex: value === SexFilterType.All ? null : value }}
    >
      {children}
    </SearchLink>
  );
};

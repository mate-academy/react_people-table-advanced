import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { PersonSex } from '../../types';

type Props = {
  sexValue: keyof typeof PersonSex,
};

export const PersonSexItem: React.FC<Props> = ({ sexValue }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  let sexParam: string | null = PersonSex[sexValue];
  let isActive = sex === sexParam;

  if (sexValue === 'All') {
    sexParam = null;
    isActive = !sex;
  }

  return (
    <SearchLink
      className={cn(
        { 'is-active': isActive },
      )}
      params={{ sex: sexParam }}
    >
      {sexValue}
    </SearchLink>
  );
};

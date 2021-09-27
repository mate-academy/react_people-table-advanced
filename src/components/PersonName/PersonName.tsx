import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './PersonName.scss';

interface Props {
  name: string,
  slug: string,
  sex: string,
  searchParams: any,
}

export const PersonName: React.FC<Props> = ({
  name,
  slug,
  sex,
  searchParams,
}) => (
  <Link
    className={cn(
      'PersonName',
      { men: sex === 'm' },
      { women: sex === 'f' },
    )}
    to={`/people/${slug}?${searchParams}`}
  >
    {name}
  </Link>
);

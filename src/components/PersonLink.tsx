import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={cn({ 'has-text-danger': person?.sex === 'f' })}
      to={`/people/${person?.slug}`}
    >
      {person?.name}
    </Link>
  );
};

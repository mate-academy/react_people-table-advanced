import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person?: Person;
};

export const PersoneLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={cn(
        { 'has-text-danger': person?.sex === 'f' },
      )}
      to={`/people/${person?.slug}`}
    >
      {person?.name}
    </Link>
  );
};

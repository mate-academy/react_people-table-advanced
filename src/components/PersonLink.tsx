import { Person } from '../types';
import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person || !person.slug) {
    return <span>{person?.name || '-'}</span>;
  }

  return (
    <Link
      className={cn('', {
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

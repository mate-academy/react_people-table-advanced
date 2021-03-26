import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { personDetails } from './types';

export const PersonName: React.FC<personDetails> = ({ person }) => {
  const { search } = useLocation();

  if (!person) {
    return <></>;
  }

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={classNames('row__male', { row__female: person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

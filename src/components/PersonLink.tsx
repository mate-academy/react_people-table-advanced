import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

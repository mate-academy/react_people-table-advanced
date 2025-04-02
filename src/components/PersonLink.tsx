import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => {
  const { search } = useLocation();

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={{ pathname: `/people/${person.slug}`, search }}
    >
      {person.name}
    </Link>
  );
};

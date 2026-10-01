import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = React.memo(function PersonLink({ person }: Props) {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person.slug + search}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
});

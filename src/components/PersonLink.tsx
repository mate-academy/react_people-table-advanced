import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { slug, name, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};

import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const { search } = useLocation();

  return (
    <Link
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={{ pathname: `../${slug}`, search }}
    >
      {name}
    </Link>
  );
};

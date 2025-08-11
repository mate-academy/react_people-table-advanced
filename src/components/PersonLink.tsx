import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const isFemale = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {name}
    </Link>
  );
};

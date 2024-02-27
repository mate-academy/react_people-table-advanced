import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person?.sex === 'f';

  return (
    <Link
      to={`/people/${person?.slug}`}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {person?.name}
    </Link>
  );
};

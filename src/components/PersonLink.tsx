import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | string;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (typeof person === 'string') {
    return <>{person}</>;
  }

  return (
    <Link
      relative="path"
      to={`../${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

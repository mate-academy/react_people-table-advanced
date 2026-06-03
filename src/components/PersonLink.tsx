import React from 'react';
import { Person } from '../types/Person';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person | string;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (typeof person === 'string') {
    return <p>{person}</p>;
  }

  return (
    <Link
      to={`../${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

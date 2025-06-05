import React from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      to={{ pathname: `../${person.slug}`, search }}
    >
      {person.name}
    </Link>
  );
};

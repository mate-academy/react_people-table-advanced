import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Sex } from '../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`${person.slug}` + `${search}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.female,
      })}
    >
      {person.name}
    </Link>
  );
};

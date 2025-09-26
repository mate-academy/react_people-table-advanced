import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  search: string;
};

export const PersonLink: React.FC<Props> = ({ person, search }) => {
  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

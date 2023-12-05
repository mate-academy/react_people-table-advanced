import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PersonType } from '../types';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

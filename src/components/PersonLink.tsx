import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

const FEMALE = 'f';

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': FEMALE === sex,
      })}
    >
      {name}
    </Link>
  );
};

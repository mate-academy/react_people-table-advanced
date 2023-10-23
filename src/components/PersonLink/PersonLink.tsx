import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};

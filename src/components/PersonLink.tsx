import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({
  person,
}) => {
  const {
    sex,
    slug,
    name,
  } = person;

  return (
    <Link
      className={cn({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};

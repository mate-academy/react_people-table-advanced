import { Link } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
